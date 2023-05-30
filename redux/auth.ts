import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {errorActions} from '@redux/error';
import Rest from '@api/rest';
import {ActionStatus, type ActionFulfilled, type ActionRejected} from '@typing/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@constants/index';

export type AuthState = {
    isLoggedIn: boolean;
    token?: string;
    email?: string;
};

const intialAuthState = {
    isLoggedIn: false,
};

const setAuth = (_state: AuthState, action: PayloadAction<AuthState>) => action.payload;

const disconnect = () => ({isLoggedIn: false});

export type Token = {
    token: string;
};

const getAuthState = async (data: Token, email: string, remember?: boolean) => {
    const {token} = data;
    const status: typeof ActionStatus.OK = ActionStatus.OK;
    const authState: AuthState = {
        isLoggedIn: true,
        email,
        token,
    };
    Rest.apiToken = token;
    if (remember) {
        try {
            // TODO: move async storage to individual items to simplify state reconciliation
            await AsyncStorage.setItem(CONSTANTS.STORAGE.AUTH, JSON.stringify(authState));
        } catch (e) {}
    }
    return {
        status,
        data: authState,
    };
};

type Login = {
    email: string;
    password: string;
    remember: boolean;
}

const login = createAsyncThunk<ActionFulfilled<AuthState>, Login, ActionRejected>(
    'login',
    async ({email, password, remember}, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.login(email, password);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return await getAuthState(data, email, remember);
    },
);

type Register = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    remember: boolean;
}

const register = createAsyncThunk<ActionFulfilled<AuthState>, Register, ActionRejected>(
    'register',
    async ({name, email, password, passwordConfirm, remember}, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.register(name, email, password, passwordConfirm);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return await getAuthState(data, email, remember);
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: intialAuthState,
    reducers: {
        setAuth,
        disconnect,
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => setAuth(state, {...action, payload: action.payload.data}));
        builder.addCase(register.fulfilled, (state, action) => setAuth(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = authSlice;

const authActions = {
    ...actions,
    login,
    register,
};

export {authActions};

export default reducer;

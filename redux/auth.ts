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

type GetToken = {
    email: string;
    password: string;
    remember: boolean;
};

const getToken = createAsyncThunk<ActionFulfilled<AuthState>, GetToken, ActionRejected>(
    'getToken',
    async ({email, password, remember}, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getApiToken(email, password);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const {token} = data;
        const authState = {
            isLoggedIn: true,
            email,
            token,
        };
        Rest.apiToken = token;
        if (remember) {
            await AsyncStorage.setItem(CONSTANTS.STORAGE.AUTH, JSON.stringify(authState));
        }
        return {
            status: ActionStatus.OK,
            data: authState,
        };
    }
);

type Login = {
    email: string;
    password: string;
    remember: boolean;
}

const login = createAsyncThunk<ActionFulfilled, Login, ActionRejected>(
    'login',
    async ({email, password, remember}, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.login(email, password);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const {payload} = await dispatch(getToken({email, password, remember}));
        if (payload && payload.status === ActionStatus.ERROR) {
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return {status: ActionStatus.OK};
    },
);

type Register = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    remember: boolean;
}

const register = createAsyncThunk<ActionFulfilled, Register, ActionRejected>(
    'register',
    async ({name, email, password, passwordConfirm, remember}, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.register(name, email, password, passwordConfirm);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const {payload} = await dispatch(getToken({email, password, remember}));
        if (payload && payload.status === ActionStatus.ERROR) {
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return {status: ActionStatus.OK};
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
        builder.addCase(getToken.fulfilled, (state, action) => setAuth(state, {...action, payload: action.payload.data}));
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

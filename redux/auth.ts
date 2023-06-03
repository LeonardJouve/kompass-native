import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {errorActions} from '@redux/error';
import Rest from '@api/rest';
import {ActionStatus, type ActionFulfilled, type ActionRejected} from '@typing/redux';
import {setAuthStore} from '@utils/auth';

export enum AuthKeys {
    token = 'token',
    email = 'email',
}

export type AuthStore = Record<keyof typeof AuthKeys, string>;

export type AuthState = {
    isLoggedIn: boolean;
} & Partial<AuthStore>;

const intialAuthState = {
    isLoggedIn: false,
};

const setAuth = (_state: AuthState, action: PayloadAction<AuthState>) => action.payload;

const connect = (_state: AuthState, action: PayloadAction<AuthStore>) => ({
    ...action.payload,
    isLoggedIn: true,
});

const disconnect = () => ({isLoggedIn: false});

export type Token = {
    token: string;
};

const getAuthState = async (data: Token, email: string, remember?: boolean) => {
    const {token} = data;
    const status: typeof ActionStatus.OK = ActionStatus.OK;
    const authState: AuthStore = {
        email,
        token,
    };
    Rest.apiToken = token;
    if (remember) {
        setAuthStore(authState);
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

const login = createAsyncThunk<ActionFulfilled<AuthStore>, Login, ActionRejected>(
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

const register = createAsyncThunk<ActionFulfilled<AuthStore>, Register, ActionRejected>(
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
        connect,
        disconnect,
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => connect(state, {...action, payload: action.payload.data}));
        builder.addCase(register.fulfilled, (state, action) => connect(state, {...action, payload: action.payload.data}));
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

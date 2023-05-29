import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorActions} from '@redux/reducers/error';
import {type AuthState} from '@redux/reducers/auth';
import Rest from '@api/rest';
import {ActionStatus, type ActionFulfilled, type ActionRejected} from '@typing/redux';

type GetToken = {
    email: string;
    password: string;
    remember: boolean;
};

export const getToken = createAsyncThunk<ActionFulfilled<AuthState>, GetToken, ActionRejected>(
    'getToken',
    async ({email, password, remember}: GetToken, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getApiToken(email, password);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const {token} = data;
        Rest.apiToken = token;
        if (remember) {
            // TODO: Store token with redux persist
        }
        return {
            status: ActionStatus.OK,
            data: {
                email,
                token: data.token,
            },
        };
    }
);

type Login = {
    email: string;
    password: string;
    remember: boolean;
}

export const login = createAsyncThunk<ActionFulfilled, Login, ActionRejected>(
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

export const register = createAsyncThunk<ActionFulfilled, Register, ActionRejected>(
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

import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorActions} from '@redux/reducers/error';
import Rest from '@api/rest';

type GetToken = {
    email: string;
    password: string;
    remember: boolean;
};

export const getToken = createAsyncThunk(
    'getToken',
    async ({email, password, remember}: GetToken, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getApiToken(email, password);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        if (remember) {
            // Store token
        }
        Rest.apiToken = data.token;
        return {
            email,
            token: data.token,
        };
    }
);

type Login = {
    email: string;
    password: string;
    remember: boolean;
}

export const login = createAsyncThunk(
    'login',
    async ({email, password, remember}: Login, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.login(email, password);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        return dispatch(getToken({email, password, remember}));
    },
);

type Register = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    remember: boolean;
}

export const register = createAsyncThunk(
    'register',
    async ({name, email, password, passwordConfirm, remember}: Register, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.register(name, email, password, passwordConfirm);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        return dispatch(getToken({email, password, remember}));
    },
);

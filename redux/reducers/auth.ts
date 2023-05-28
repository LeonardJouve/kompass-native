import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getToken} from '@redux/actions/auth';

export type AuthState = {
    token?: string;
    email?: string;
};

const intialAuthState = {};

const setAuth = (state: AuthState, action: PayloadAction<AuthState>) => action.payload;

const authSlice = createSlice({
    name: 'auth',
    initialState: intialAuthState,
    reducers: {
        setAuth,
    },
    extraReducers: (builder) => {
        builder.addCase(getToken.fulfilled, setAuth);
    },
});

const {reducer, actions: authActions} = authSlice;

export {authActions};

export default reducer;

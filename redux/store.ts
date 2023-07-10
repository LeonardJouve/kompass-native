import {useDispatch} from 'react-redux';
import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import language from '@redux/language';
import modal from '@redux/modal';
import theme from '@redux/theme';
import config from '@redux/config';
import map from '@redux/map';
import error from '@redux/error';
import auth from '@redux/auth';
import inventory from '@redux/inventory';
import craft from '@redux/craft';
import {GlobalState} from '@typing/global_state';

export type AppDispatch = ThunkDispatch<GlobalState, any, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

const store = configureStore({
    reducer: {
        language,
        modal,
        theme,
        config,
        map,
        error,
        auth,
        inventory,
        craft,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

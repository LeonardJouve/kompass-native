import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import test from '@redux/reducers/test';
import language from '@redux/reducers/language';
import modal from '@redux/reducers/modal';
import theme from '@redux/reducers/theme';
import {GlobalState} from '@typing/global_state';

export type AppDispatch = ThunkDispatch<GlobalState, any, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

const store = configureStore({
    reducer: {
        test,
        language,
        modal,
        theme,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

import {useDispatch} from 'react-redux';
import {AnyAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import language from '@redux/reducers/language';
import modal from '@redux/reducers/modal';
import theme from '@redux/reducers/theme';
import config from '@redux/reducers/config';
import map from '@redux/reducers/map';
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
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

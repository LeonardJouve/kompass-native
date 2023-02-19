import {configureStore} from '@reduxjs/toolkit';
import base from '@redux/reducers/base';
import language from '@redux/reducers/language';
import modal from '@redux/reducers/modal';
import theme from '@redux/reducers/theme';

const store = configureStore({
    reducer: {
        base,
        language,
        modal,
        theme,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

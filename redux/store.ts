import {configureStore} from '@reduxjs/toolkit';
import base from '@redux/reducers/base';
import lang from '@redux/reducers/lang';

const store = configureStore({
    reducer: {
        base,
        lang,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

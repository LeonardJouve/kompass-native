import {configureStore} from '@reduxjs/toolkit';
import base from '@redux/reducers/base';
import language from '@redux/reducers/language';

const store = configureStore({
    reducer: {
        base,
        language,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

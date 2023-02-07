import {configureStore} from '@reduxjs/toolkit';
import base from '@redux/reducers/base';
import language from '@redux/reducers/language';
import modal from '@redux/reducers/modal';

const store = configureStore({
    reducer: {
        base,
        language,
        modal,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

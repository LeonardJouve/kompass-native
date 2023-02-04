import {configureStore} from '@reduxjs/toolkit';
import base from './reducers/base';

const store = configureStore({
    reducer: {
        base,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export default store;

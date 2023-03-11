import {createAsyncThunk} from '@reduxjs/toolkit';
import {getConfig} from './config';

export const initialFetch = createAsyncThunk(
    'initialFetch',
    (args, {dispatch}) => {
        dispatch(getConfig());
        return {data: true};
    },
);

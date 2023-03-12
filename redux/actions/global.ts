import {createAsyncThunk} from '@reduxjs/toolkit';
import {getConfig} from '@redux/actions/config';

export const initialFetch = createAsyncThunk(
    'initialFetch',
    (args, {dispatch}) => {
        dispatch(getConfig());
        return {data: true};
    },
);

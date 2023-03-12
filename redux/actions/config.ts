import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendError} from '@redux/actions/error';
import Client from '@api/rest';

export const getConfig = createAsyncThunk(
    'getConfig',
    async (args, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Client.getConfig();
        if (error) {
            dispatch(sendError({data, url, status}));
            return rejectWithValue('error');
        }
        return data;
    },
);

import {createAsyncThunk} from '@reduxjs/toolkit';
import Client from '@api/rest';
import {sendError} from '@redux/actions/error';

export const getTest = createAsyncThunk(
    'getTest',
    async (arg, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Client.getTest();
        if (error) {
            dispatch(sendError({data, url, status}));
            return rejectWithValue('error');
        }
        return data.test;
    }
);


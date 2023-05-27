import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorActions} from '@redux/reducers/error';
import Client from '@api/rest';

export const getConfig = createAsyncThunk(
    'getConfig',
    async (args, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Client.getConfig();
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        return data;
    },
);

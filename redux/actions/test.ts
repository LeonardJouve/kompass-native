import {createAsyncThunk} from '@reduxjs/toolkit';
import Client from '@api/rest';

export const getTest = createAsyncThunk<string>(
    'getTest',
    async () => {
        const {data, error} = await Client.getTest();
        if (error) {
            return data.message;
        }
        return data.test;
    }
);


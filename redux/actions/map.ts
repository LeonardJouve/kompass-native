import {createAsyncThunk} from '@reduxjs/toolkit';
import {LatLng} from 'react-native-maps';
import Client from '@api/rest';
import {errorActions} from '@redux/reducers/error';

export const getPois = createAsyncThunk(
    'getPois',
    async ({latitude, longitude}: LatLng, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Client.getPois(latitude, longitude);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        return data;
    },
);

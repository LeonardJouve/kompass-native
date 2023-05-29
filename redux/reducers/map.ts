import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {type LatLng} from 'react-native-maps';
import {errorActions} from '@redux/reducers/error';
import Rest from '@api/rest';
import type {Poi} from '@typing/map';

export type MapState = {
    pois: Poi[];
};

const initialMapState: MapState = {
    pois: [],
};

const setPois = (state: MapState, action: PayloadAction<Poi[]>) => ({
    ...state,
    pois: action.payload,
});

const getPois = createAsyncThunk(
    'getPois',
    async ({latitude, longitude}: LatLng, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getPois(latitude, longitude);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        return data;
    },
);

const mapSlice = createSlice({
    name: 'map',
    initialState: initialMapState,
    reducers: {
        setPois,
    },
    extraReducers: (builder) => {
        builder.addCase(getPois.fulfilled, setPois);
    },
});

const {reducer, actions} = mapSlice;

const mapActions = {
    ...actions,
    getPois,
};

export {mapActions};

export default reducer;

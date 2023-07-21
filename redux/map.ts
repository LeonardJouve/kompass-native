import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {LatLng} from 'react-native-maps';
import {errorActions} from '@redux/error';
import Rest from '@api/rest';
import type {Poi} from '@typing/map';
import {ActionStatus, type ActionFulfilled, type ActionRejected} from '@typing/redux';

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

const getPois = createAsyncThunk<ActionFulfilled<Poi[]>, LatLng, ActionRejected>(
    'getPois',
    async ({latitude, longitude}, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getPois(latitude, longitude);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return {status: ActionStatus.OK, data};
    },
);

const mapSlice = createSlice({
    name: 'map',
    initialState: initialMapState,
    reducers: {
        setPois,
    },
    extraReducers: (builder) => {
        builder.addCase(getPois.fulfilled, (state, action) => setPois(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = mapSlice;

const mapActions = {
    ...actions,
    getPois,
};

export {mapActions};

export default reducer;

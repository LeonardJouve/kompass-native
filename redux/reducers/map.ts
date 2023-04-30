import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getPois} from '@redux/actions/map';
import {Poi} from '@typing/map';

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

const {reducer, actions: mapsActions} = mapSlice;

export {mapsActions};

export default reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import  type {Craft} from '@typing/craft';
import type {OneToOneIdObject} from '@typing/redux';

export type CraftState = {
    availableCrafts: OneToOneIdObject<Craft>;
};

const initialCraftState: CraftState = {
    availableCrafts: {},
};

const setAvailableCrafts = (state: CraftState, action: PayloadAction<CraftState['availableCrafts']>) => ({
    ...state,
    availableCrafts: action.payload,
});

const craftSlice = createSlice({
    name: 'craft',
    initialState: initialCraftState,
    reducers: {
        setAvailableCrafts,
    },
});

const {reducer, actions: craftActions} = craftSlice;

export {craftActions};

export default reducer;

import {createSlice} from '@reduxjs/toolkit';

export type BaseState = string;

const initialBaseState = 'base';

const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {},
});

const {reducer, actions: baseActions} = baseSlice;

export {baseActions};

export default reducer;

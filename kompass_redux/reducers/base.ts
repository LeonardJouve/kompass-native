import {createSlice} from '@reduxjs/toolkit';

export type BaseState = string;

export const initialBaseState = 'base';

const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {},
});

const {reducer, actions} = baseSlice;

export {actions};

export default reducer;

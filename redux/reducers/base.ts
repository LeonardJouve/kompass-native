import {createSlice} from '@reduxjs/toolkit';

export type BaseState = string;

export const initialBaseState = 'base';

const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {},
});

const {reducer, actions: actionsBase} = baseSlice;

export {actionsBase};

export default reducer;

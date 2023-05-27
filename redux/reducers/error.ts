import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ErrorState = {
    visible: boolean;
    data: any,
    url?: string,
    status?: number,
};

const initialErrorState = {
    visible: false,
    data: {},
};

const setError = (state: ErrorState, action: PayloadAction<ErrorState>) => ({
    ...action.payload,
    visible: true,
});

const setVisibility = (state: ErrorState, action: PayloadAction<boolean>) => ({
    ...state,
    visible: action.payload,
});

const errorSlice = createSlice({
    name: 'error',
    initialState: initialErrorState,
    reducers: {
        setError,
        setVisibility,
    },
});

const {reducer, actions: errorActions} = errorSlice;

export {errorActions};

export default reducer;

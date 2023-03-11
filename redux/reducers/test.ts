import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTest} from '@redux/actions/test';

export type TestState = string;

const initialTestState = 'intial test';

const setTest = (state: TestState, action: PayloadAction<string>) => action.payload;

const testSlice = createSlice({
    name: 'test',
    initialState: initialTestState,
    reducers: {
        setTest,
    },
    extraReducers: (builder) => {
        builder.addCase(getTest.fulfilled, setTest);
    },
});

const {reducer, actions: testActions} = testSlice;

export {testActions};

export default reducer;

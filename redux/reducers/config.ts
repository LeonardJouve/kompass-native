import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getConfig} from '@redux/actions/config';

export type ConfigState = Record<string, any>;

const initialConfigState = {};

const setConfig = (state: ConfigState, action: PayloadAction<ConfigState>) => action.payload;

const configSlice = createSlice({
    name: 'config',
    initialState: initialConfigState,
    reducers: {
        setConfig,
    },
    extraReducers: (builder) => {
        builder.addCase(getConfig.fulfilled, setConfig);
    },
});

const {reducer, actions: configActions} = configSlice;

export {configActions};

export default reducer;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {errorActions} from '@redux/reducers/error';
import Rest from '@api/rest';

export type ConfigState = Record<string, any>;

const initialConfigState = {};

const setConfig = (state: ConfigState, action: PayloadAction<ConfigState>) => action.payload;

const getConfig = createAsyncThunk(
    'getConfig',
    async (args, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getConfig();
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue('error');
        }
        return data;
    },
);

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

const {reducer, actions} = configSlice;

const configActions = {
    ...actions,
    getConfig,
};

export {configActions};

export default reducer;

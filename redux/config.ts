import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {errorActions} from '@redux/error';
import Rest from '@api/rest';
import {ActionStatus, type ActionFulfilled, type ActionRejected} from '@typing/redux';

export type ConfigState = Record<string, any>;

const initialConfigState = {};

const setConfig = (_state: ConfigState, action: PayloadAction<ConfigState>) => action.payload;

const getConfig = createAsyncThunk<ActionFulfilled<ConfigState>, undefined, ActionRejected>(
    'getConfig',
    async (_args, {dispatch, rejectWithValue}) => {
        const {data, error, url, status} = await Rest.getConfig();
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return {status: ActionStatus.OK, data};
    },
);

const configSlice = createSlice({
    name: 'config',
    initialState: initialConfigState,
    reducers: {
        setConfig,
    },
    extraReducers: (builder) => {
        builder.addCase(getConfig.fulfilled, (state, action) => setConfig(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = configSlice;

const configActions = {
    ...actions,
    getConfig,
};

export {configActions};

export default reducer;

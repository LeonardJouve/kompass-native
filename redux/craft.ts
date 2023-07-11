import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Rest from '@api/rest';
import {errorActions} from '@redux/error';
import {ActionStatus, type ActionFulfilled, type ActionRejected, type OneToOneIdObject} from '@typing/redux';
import  type {Craft} from '@typing/craft';

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

const getAvailableCrafts = createAsyncThunk<ActionFulfilled<CraftState['availableCrafts']>, undefined, ActionRejected>(
    'getAvailableCrafts',
    async (_args, {dispatch, rejectWithValue}) => {
        const {data, url, error, status} = await Rest.getAvailableCrafts();
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const formattedData = data.reduce((acc, craft) => ({
            ...acc,
            [craft.craft_id]: craft,
        }), {});
        return {status: ActionStatus.OK, data: formattedData};
    },
);


const craftSlice = createSlice({
    name: 'craft',
    initialState: initialCraftState,
    reducers: {
        setAvailableCrafts,
    },
    extraReducers: (builder) => {
        builder.addCase(getAvailableCrafts.fulfilled, (state, action) => setAvailableCrafts(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = craftSlice;

const craftActions = {
    ...actions,
    getAvailableCrafts,
};

export {craftActions};

export default reducer;

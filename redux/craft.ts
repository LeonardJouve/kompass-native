import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Rest from '@api/rest';
import {inventoryActions} from '@redux/inventory';
import {errorActions} from '@redux/error';
import {ActionStatus, type ActionFulfilled, type ActionRejected, type OneToOneIdObject} from '@typing/redux';
import  type {Craft, CraftResponse} from '@typing/craft';

export type CraftState = {
    crafts: OneToOneIdObject<Craft>;
};

const initialCraftState: CraftState = {
    crafts: {},
};

const setCrafts = (state: CraftState, action: PayloadAction<CraftState['crafts']>) => ({
    ...state,
    crafts: action.payload,
});

const getCrafts = createAsyncThunk<ActionFulfilled<CraftState['crafts']>, undefined, ActionRejected>(
    'getcrafts',
    async (_args, {dispatch, rejectWithValue}) => {
        const {data, url, error, status} = await Rest.getCrafts();
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

type CraftArguments = {
    craftId: number;
    selectedItemsId: number[];
    amount: number;
};

const craft = createAsyncThunk<ActionFulfilled<CraftResponse>, CraftArguments, ActionRejected>(
    'craft',
    async ({craftId, selectedItemsId, amount}, {dispatch, rejectWithValue}) => {
        const {data, url, error, status} = await Rest.craft(craftId, selectedItemsId, amount);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const {result, removed} = data;
        dispatch(inventoryActions.addInventoryItem(result));
        removed.forEach((removedItem) => dispatch(inventoryActions.deleteInventoryItem({
            itemId: removedItem.item_id,
            amount: removedItem.amount,
        })));
        return {status: ActionStatus.OK, data};
    },
);

const craftSlice = createSlice({
    name: 'craft',
    initialState: initialCraftState,
    reducers: {
        setCrafts,
    },
    extraReducers: (builder) => {
        builder.addCase(getCrafts.fulfilled, (state, action) => setCrafts(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = craftSlice;

const craftActions = {
    ...actions,
    getCrafts,
    craft,
};

export {craftActions};

export default reducer;

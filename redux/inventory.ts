import Rest from '@api/rest';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {errorActions} from '@redux/error';
import {ActionStatus, type ActionFulfilled, type ActionRejected, type OneToOneIdObject} from '@typing/redux';
import type {Item} from '@typing/inventory';

export type InventoryState = {
    items: OneToOneIdObject<Item>;
};

const initialInventoryState = {
    items: {},
};

const setInventoryItems = (state: InventoryState, action: PayloadAction<InventoryState['items']>) => ({
    ...state,
    items: action.payload,
});

const addInventoryItem = (state: InventoryState, action: PayloadAction<Item>) => ({
    ...state,
    items: {
        ...state.items,
        [action.payload.item_id]: action.payload,
    },
});

const removeInventoryItem = (state: InventoryState, action: PayloadAction<Item['item_id']>) => {
    Reflect.deleteProperty(state.items, action.payload);
};

const removeInventoryItems = (state: InventoryState, action: PayloadAction<Array<Item['item_id']>>) => {
    action.payload.forEach((id) => Reflect.deleteProperty(state.items, id));
};

const getItems = createAsyncThunk<ActionFulfilled<InventoryState['items']>, undefined, ActionRejected>(
    'getInventoryItems',
    async (_args, {dispatch, rejectWithValue}) => {
        const {data, url, error, status} = await Rest.getItems();
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        const formattedData = data.reduce((acc, item) => ({
            ...acc,
            [item.item_id]: item,
        }), {});
        return {status: ActionStatus.OK, data: formattedData};
    },
);

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialInventoryState,
    reducers: {
        setInventoryItems,
        addInventoryItem,
        removeInventoryItem,
        removeInventoryItems,
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => setInventoryItems(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = inventorySlice;

const inventoryActions = {
    ...actions,
    getItems,
};

export {inventoryActions};

export default reducer;

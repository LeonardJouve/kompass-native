import Rest from '@api/rest';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {errorActions} from '@redux/error';
import {getInventoryItem} from '@redux/selectors/inventory';
import {ActionStatus, type ActionFulfilled, type ActionRejected, type OneToOneIdObject} from '@typing/redux';
import type {GlobalState} from '@typing/global_state';
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

const addInventoryItem = (state: InventoryState, action: PayloadAction<Item>) => {
    const item = state.items[action.payload.item_id];
    if (item) {
        item.amount += action.payload.amount;
        return;
    }
    return {
        ...state,
        items: {
            ...state.items,
            [action.payload.item_id]: action.payload,
        },
    };
};

type deleteItemPayload = {
    itemId: Item['item_id'];
    amount: number;
};

const deleteInventoryItem = (state: InventoryState, action: PayloadAction<deleteItemPayload>) => {
    const {itemId, amount} = action.payload;
    const item = state.items[itemId];
    if (!item || amount > item.amount) {
        return;
    }
    if (amount === item.amount) {
        Reflect.deleteProperty(state.items, itemId);
    } else {
        item.amount -= amount;
    }
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

const deleteItem = createAsyncThunk<ActionFulfilled<deleteItemPayload>, {itemId: Item['item_id']; amount?: number}, ActionRejected>(
    'deleteItem',
    async ({itemId, amount}, {getState, dispatch, rejectWithValue}) => {
        const state = getState() as GlobalState;
        const maxItemAmount = getInventoryItem(state, itemId)?.amount;
        const itemAmount = amount || maxItemAmount || 0;
        const {data, url, error, status} = await Rest.deleteItem(itemId, itemAmount);
        if (error) {
            dispatch(errorActions.setError({data, url, status}));
            return rejectWithValue({status: ActionStatus.ERROR});
        }
        return {status: ActionStatus.OK, data: {
            itemId,
            amount: itemAmount,
        }};
    },
);

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialInventoryState,
    reducers: {
        setInventoryItems,
        addInventoryItem,
        deleteInventoryItem,
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => setInventoryItems(state, {...action, payload: action.payload.data}));
        builder.addCase(deleteItem.fulfilled, (state, action) => deleteInventoryItem(state, {...action, payload: action.payload.data}));
    },
});

const {reducer, actions} = inventorySlice;

const inventoryActions = {
    ...actions,
    getItems,
    deleteItem,
};

export {inventoryActions};

export default reducer;

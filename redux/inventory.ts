import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {InventoryItem} from '@typing/inventory';
import {OneToOneIdObject} from '@typing/redux';

export type InventoryState = {
    items: OneToOneIdObject<InventoryItem>;
};

const initialInventoryState = {
    items: {},
};

const setInventoryItems = (state: InventoryState, action: PayloadAction<InventoryState['items']>) => ({
    ...state,
    items: action.payload,
});

const addInventoryItem = (state: InventoryState, action: PayloadAction<InventoryItem>) => ({
    ...state,
    items: {
        ...state.items,
        [action.payload.id]: action.payload,
    },
});

const removeInventoryItem = (state: InventoryState, action: PayloadAction<InventoryItem['id']>) => {
    const items = state.items;
    Reflect.deleteProperty(items, action.payload);
    return {
        ...state,
        items,
    };
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialInventoryState,
    reducers: {
        setInventoryItems,
        addInventoryItem,
        removeInventoryItem,
    },
});

const {reducer, actions: inventoryActions} = inventorySlice;

export {inventoryActions};

export default reducer;

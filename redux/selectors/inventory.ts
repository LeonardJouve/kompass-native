import {GlobalState} from '@typing/global_state';

export const getInventoryItems = (state: GlobalState) => state.inventory.items;

export const getInventoryItemsArray = (state: GlobalState) => Object.values(getInventoryItems(state));

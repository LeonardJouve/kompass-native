import type {GlobalState} from '@typing/global_state';
import type {Item} from '@typing/inventory';

export const getInventoryItems = (state: GlobalState) => state.inventory.items;

export const getInventoryItemsArray = (state: GlobalState) => Object.values(getInventoryItems(state));

export const getInventoryItem = (state: GlobalState, itemId: number): Item | undefined => state.inventory.items[itemId];

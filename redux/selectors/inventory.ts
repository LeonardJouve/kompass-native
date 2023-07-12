import type {GlobalState} from '@typing/global_state';
import type {Item, ItemType} from '@typing/inventory';

export const getInventoryItems = (state: GlobalState) => state.inventory.items;

export const getInventoryItemsArray = (state: GlobalState) => Object.values(getInventoryItems(state));

export const getInventoryItem = (state: GlobalState, itemId: number): Item | undefined => state.inventory.items[itemId];

export const getInventoryItemsWithType = (state: GlobalState, type: ItemType) => getInventoryItemsArray(state).filter((item) => item.type === type);

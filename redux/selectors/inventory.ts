import {GlobalState} from '@typing/global_state';
import {InventoryCategory, InventoryItem} from '@typing/inventory';

export const getInventoryItems = (state: GlobalState) => state.inventory.items;

export const getInventoryItemsArray = (state: GlobalState) => Object.values(getInventoryItems(state));

export const getInventoryItemsByCategory = (state: GlobalState) => {
    const inventoryItemsByCategoryMap = new Map<InventoryCategory, InventoryItem[]>();
    getInventoryItemsArray(state).forEach((inventoryItem) => {
        const categoryItems = inventoryItemsByCategoryMap.get(inventoryItem.category);
        if (!categoryItems) {
            inventoryItemsByCategoryMap.set(inventoryItem.category, [inventoryItem]);
            return;
        }
        categoryItems.push(inventoryItem);
    });
    return Array.from(inventoryItemsByCategoryMap, ([title, data]) => ({title, data}));
};

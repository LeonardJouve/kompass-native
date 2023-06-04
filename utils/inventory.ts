import {
    InventoryListItemInfoType,
    type InventoryCategoryName,
    type InventoryItem,
    type InventoryListItemInfo,
} from '@typing/inventory';

export const filterInventoryItemsByCategory = (inventoryItems: InventoryItem[]): InventoryListItemInfo[] => {
    const inventoryItemsByCategoryMap = new Map<InventoryCategoryName, InventoryItem[]>();
    inventoryItems.forEach((inventoryItem) => {
        const categoryItems = inventoryItemsByCategoryMap.get(inventoryItem.category);
        if (!categoryItems) {
            inventoryItemsByCategoryMap.set(inventoryItem.category, [inventoryItem]);
            return;
        }
        categoryItems.push(inventoryItem);
    });
    return Array.from(inventoryItemsByCategoryMap).reduce<InventoryListItemInfo[]>((accumulator, [category, items]) => {
        accumulator.push({
            type: InventoryListItemInfoType.HEADER,
            key: category,
            data: {categoryName: category},
        });
        accumulator.push({
            type: InventoryListItemInfoType.SEPARATOR,
            key: `${category}-separator`,
            data: null,
        });
        items.forEach((item) => accumulator.push({
            type: InventoryListItemInfoType.ITEM,
            key: item.name,
            data: {item},
        }));
        return accumulator;
    }, []);
};

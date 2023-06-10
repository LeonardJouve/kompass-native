import {
    InventoryListItemInfoType,
    InventoryOrder,
    type InventoryCategoryName,
    type InventoryItem,
    type InventoryListItemInfo,
} from '@typing/inventory';

export const filterInventoryItemsByCategory = (inventoryItems: InventoryItem[], search: string, order: InventoryOrder): InventoryListItemInfo[] => {
    const inventoryItemsByCategoryMap = new Map<InventoryCategoryName, InventoryItem[]>();
    inventoryItems.forEach((inventoryItem) => {
        const matchSearch = inventoryItem.name.includes(search);
        if (!matchSearch) {
            return;
        }
        const categoryItems = inventoryItemsByCategoryMap.get(inventoryItem.category);
        if (!categoryItems) {
            inventoryItemsByCategoryMap.set(inventoryItem.category, [inventoryItem]);
            return;
        }
        categoryItems.push(inventoryItem);
    });
    return Array.from(inventoryItemsByCategoryMap).
        sort(([a], [b]) => order === InventoryOrder.ASCENDING ? a.localeCompare(b) : b.localeCompare(a)).
        reduce<InventoryListItemInfo[]>((accumulator, [category, items]) => {
            accumulator.push({
                type: InventoryListItemInfoType.HEADER,
                key: category,
                data: {categoryName: category},
            });
            accumulator.push({
                type: InventoryListItemInfoType.SEPARATOR,
                key: `${category}_separator`,
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

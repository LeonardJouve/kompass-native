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
                key: `${category}_top_separator`,
                data: {placement: 'top'},
            });
            items.forEach((item) => accumulator.push({
                type: InventoryListItemInfoType.ITEM,
                key: item.name,
                data: {item},
            }));
            accumulator.push({
                type: InventoryListItemInfoType.SEPARATOR,
                key: `${category}_bottom_separator}`,
                data: {placement: 'bottom'},
            });
            return accumulator;
        }, []);
};

export const filterInventoryItemsByAmount = (inventoryItems: InventoryItem[], search: string, order: InventoryOrder): InventoryListItemInfo[] => {
    const inventoryItemsByAmount: InventoryListItemInfo[] = inventoryItems.
        filter((item) => item.name.includes(search)).
        sort((a, b) => order === InventoryOrder.ASCENDING ? b.amount - a.amount : a.amount - b.amount).
        map((item) => ({
            type: InventoryListItemInfoType.ITEM,
            key: item.name,
            data: {item},
        }));
    if (inventoryItemsByAmount.length) {
        inventoryItemsByAmount.unshift({
            type: InventoryListItemInfoType.SEPARATOR,
            key: 'items_top_separator',
            data: {placement: 'top'},
        });
        inventoryItemsByAmount.unshift({
            type: InventoryListItemInfoType.HEADER,
            key: 'items',
            data: {categoryName: 'items'},
        });
        inventoryItemsByAmount.push({
            type: InventoryListItemInfoType.SEPARATOR,
            key: 'items_bottom_separator',
            data: {placement: 'bottom'},
        });
    }
    return inventoryItemsByAmount;
};

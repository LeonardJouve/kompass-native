import {
    InventoryListItemInfoType,
    InventoryOrder,
    type InventoryCategory,
    type Item,
    type InventoryListItemInfo,
} from '@typing/inventory';

export const filterInventoryItemsByCategory = (inventoryItems: Item[], search: string, order: InventoryOrder): InventoryListItemInfo[] => {
    const inventoryItemsByCategoryMap = new Map<InventoryCategory, Item[]>();
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
                data: {category},
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
            key: 'all_top_separator',
            data: {placement: 'top'},
        });
        inventoryItemsByAmount.unshift({
            type: InventoryListItemInfoType.HEADER,
            key: 'all',
            data: {category: 'all'},
        });
        inventoryItemsByAmount.push({
            type: InventoryListItemInfoType.SEPARATOR,
            key: 'all_bottom_separator',
            data: {placement: 'bottom'},
        });
    }
    return inventoryItemsByAmount;
};

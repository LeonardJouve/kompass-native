import {
    InventoryListItemType,
    InventoryOrder,
    type InventoryCategory,
    type Item,
    type InventoryListItem,
} from '@typing/inventory';

// TODO: sort with locale formatted item name

export const filterInventoryItemsByCategory = (inventoryItems: Item[], search: string, order: InventoryOrder): InventoryListItem[] => {
    const filteredItems = inventoryItems.filter((inventoryItem) => inventoryItem.name.includes(search.toLocaleLowerCase()));
    const formattedCategories = filteredItems.reduce<Array<{category: InventoryCategory; items: Item[]}>>((acc, inventoryItem) => {
        const {category} = inventoryItem;
        const existantCategory = acc.find((cat) => cat.category === category);
        if (existantCategory) {
            existantCategory.items.push(inventoryItem);
        } else {
            acc.push({
                category,
                items: [inventoryItem],
            });
        }
        return acc;
    }, []);
    return formattedCategories.
        sort((a, b) => order === InventoryOrder.ASCENDING ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)).
        map(({category, items}) => ({
            type: InventoryListItemType.CATEGORY,
            key: category,
            data: {
                category,
                items: items.sort((a, b) => order === InventoryOrder.ASCENDING ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)),
            },
        }));
};

export const filterInventoryItemsByAmount = (inventoryItems: Item[], search: string, order: InventoryOrder): InventoryListItem[] => {
    const items: Item[] = inventoryItems.
        filter((item) => item.name.includes(search.toLocaleLowerCase())).
        sort((a, b) => order === InventoryOrder.ASCENDING ? b.amount - a.amount : a.amount - b.amount);
    return [{
        type: InventoryListItemType.CATEGORY,
        key: 'all',
        data: {
            category: 'all',
            items,
        },
    }];
};

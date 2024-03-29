export type Item = {
    item_id: number;
    name: string;
    category: ItemCategory;
    type: ItemType;
    tier: number;
    amount: number;
};

export type AvailableItem = Omit<Item, 'item_id'|'amount'> & {
    id: number;
};

export type ItemCategory = 'ressource' | 'equipement' | 'food' | 'weapon' | 'tool';

export type ItemType = 'log' | 'stick' | 'powder' | 'ingot' | 'plate' | 'vegetable' | 'soup' | 'salad';

export type InventoryCategory = ItemCategory | 'all';

export enum InventoryFilter {
    CATEGORY,
    AMOUNT,
}

export enum InventoryOrder {
    ASCENDING,
    DESCENDING,
}

export enum InventoryListItemType {
    FILTER,
    CATEGORY,
    EMPTY,
}

type EmptyListItem = {
    type: InventoryListItemType.EMPTY;
    key: 'inventory_list_empty';
    data: null;
};

type FilterListItem = {
    type: InventoryListItemType.FILTER;
    key: 'inventory_list_filter_bar';
    data: null,
};

type CategoryListItem = {
    type: InventoryListItemType.CATEGORY;
    key: InventoryCategory;
    data: {
        category: InventoryCategory;
        items: Item[];
    },
};

export type InventoryListItem = FilterListItem | CategoryListItem | EmptyListItem;

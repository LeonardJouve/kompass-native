export type Item = {
    item_id: number;
    amount: number;
    name: string;
    category: ItemCategory;
};

export type ItemCategory = 'ressource' | 'equipement' | 'food' | 'weapon' | 'tool';

export type InventoryCategory = ItemCategory | 'all';

export enum InventoryFilter {
    CATEGORY,
    AMOUNT,
}

export enum InventoryOrder {
    ASCENDING,
    DESCENDING,
}

export enum InventoryListItemInfoType {
    HEADER,
    ITEM,
    SEPARATOR,
    FILTER,
    EMPTY,
}

type ItemInfo =  {
    type: InventoryListItemInfoType.ITEM;
    key: Item['name'];
    data: {
        item: Item;
    };
};

type HeaderInfo = {
    type: InventoryListItemInfoType.HEADER;
    key: InventoryCategory;
    data: {
        category: InventoryCategory;
    };
};

type InventorySeparatorPlacement = 'top' | 'bottom';

type SeparatorInfo = {
    type: InventoryListItemInfoType.SEPARATOR;
    key: `${InventoryCategory}_${InventorySeparatorPlacement}_separator`;
    data: {placement: InventorySeparatorPlacement};
};

type EmptyInfo = {
    type: InventoryListItemInfoType.EMPTY;
    key: 'inventory_list_empty';
    data: null;
};

type FilterInfo = {
    type: InventoryListItemInfoType.FILTER;
    key: 'inventory_list_filter_bar';
    data: null,
}

export type InventoryListItemInfo = HeaderInfo | ItemInfo | SeparatorInfo | FilterInfo | EmptyInfo;

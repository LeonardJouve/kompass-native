export type InventoryItem = {
    id: 'test' | 'testtest' | 'testtesttest';
    name: 'test' | 'testtest' | 'testtesttest';
    category: InventoryCategoryName;
    amount: number;
};

export type InventoryCategoryName = 'items' | 'first_category' | 'second_category';

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
    key: InventoryItem['name'];
    data: {
        item: InventoryItem;
    };
};

type HeaderInfo = {
    type: InventoryListItemInfoType.HEADER;
    key: InventoryCategoryName;
    data: {
        categoryName: InventoryCategoryName;
    };
};

type InventorySeparatorPlacement = 'top' | 'bottom';

type SeparatorInfo = {
    type: InventoryListItemInfoType.SEPARATOR;
    key: `${InventoryCategoryName}_${InventorySeparatorPlacement}_separator`;
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

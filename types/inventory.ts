export type InventoryItem = {
    id: 'test' | 'testtest' | 'testtesttest';
    name: 'test' | 'testtest' | 'testtesttest';
    category: InventoryCategoryName;
};

export type InventoryCategoryName = 'first_category' | 'second_category';

export enum InventoryFilter {
    CATEGORY,
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

type SeparatorInfo = {
    type: InventoryListItemInfoType.SEPARATOR;
    key: `${InventoryCategoryName}_separator`;
    data: null;
};

type FilterInfo = {
    type: InventoryListItemInfoType.FILTER;
    key: 'inventory_list_filter_bar';
    data: null,
}

export type InventoryListItemInfo = HeaderInfo | ItemInfo | SeparatorInfo | FilterInfo;

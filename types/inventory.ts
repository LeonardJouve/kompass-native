export type InventoryItem = {
    id: string;
    name: 'test' | 'testtest' | 'testtesttest';
    category: InventoryCategoryName;
};

export type InventoryCategoryName = 'first_category' | 'second_category';

export enum Filter {
    CATEGORY,
}

export enum InventoryListItemInfoType {
    HEADER,
    ITEM,
    SEPARATOR,
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
    key: `${InventoryCategoryName}-separator`;
    data: null;
};

export type InventoryListItemInfo = HeaderInfo | ItemInfo | SeparatorInfo;

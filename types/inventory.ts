export type InventoryItem = {
    id: string;
    name: string;
    category: InventoryCategory;
};

export type InventoryCategory = 'first_category' | 'second_category';

import {Item, ItemType} from '@typing/inventory';

export type Ingredient = {
    type: ItemType;
};

export type Craft = {
    craft_id: number;
    category: string;
    type: ItemType;
    recipe: Ingredient[];
};

type RemovedItem = {
    item_id: number;
    amount: number;
};

export type CraftResponse = {
    result: Item;
    removed: RemovedItem[];
};

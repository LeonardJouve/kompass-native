import {ItemType} from '@typing/inventory';

export type Ingredient = {
    type: ItemType;
};

export type Craft = {
    craft_id: number;
    category: string;
    type: ItemType;
    recipe: Ingredient[];
};

export type CraftSelectedItem = {
    itemId: number;
    amount: number;
};

import type {GlobalState} from '@typing/global_state';
import type {Craft} from '@typing/craft';

export const getAvailableCrafts = (state: GlobalState) => state.craft.availableCrafts;

export const getAvailableCraftsArray = (state: GlobalState) => Object.values(getAvailableCrafts(state));

export const getAvailableCraftsByCategory = (state: GlobalState) => {
    const availableCrafts = getAvailableCraftsArray(state);
    return availableCrafts.reduce<Array<{category: Craft['category']; crafts: Craft[]}>>((acc, availableCraft) => {
        const {category} = availableCraft;
        const existantCategory = acc.find((craft) => craft.category === category);
        if (existantCategory) {
            existantCategory.crafts.push(availableCraft);
        } else {
            acc.push({
                category,
                crafts: [availableCraft],
            });
        }
        return acc;
    }, []);
};

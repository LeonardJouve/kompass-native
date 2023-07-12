import type {GlobalState} from '@typing/global_state';
import type {Craft} from '@typing/craft';

export const getCrafts = (state: GlobalState) => state.craft.crafts;

export const getCraftsArray = (state: GlobalState) => Object.values(getCrafts(state));

export const getCraftsByCategory = (state: GlobalState) => {
    const crafts = getCraftsArray(state);
    return crafts.reduce<Array<{category: Craft['category']; crafts: Craft[]}>>((acc, craft) => {
        const {category} = craft;
        const existantCategory = acc.find((existantCraft) => existantCraft.category === category);
        if (existantCategory) {
            existantCategory.crafts.push(craft);
        } else {
            acc.push({
                category,
                crafts: [craft],
            });
        }
        return acc;
    }, []);
};

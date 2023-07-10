import React from 'react';
import {useSelector} from 'react-redux';
import {View} from '@renative';
import {getAvailableCraftsByCategory} from '@redux/selectors/craft';
import CraftListCategory from '@components/craft/craft_list_category';

const CraftList = () => {
    const availableCraftsByCategory = useSelector(getAvailableCraftsByCategory);
    const renderedCrafts = availableCraftsByCategory.map(({category, crafts}) => (
        <CraftListCategory
            key={'craft_category_' + category}
            category={category}
            crafts={crafts}
        />
    ));

    return (
        <View padding={{paddingHorizontal: 's'}}>
            {renderedCrafts}
        </View>
    );
};

export default CraftList;

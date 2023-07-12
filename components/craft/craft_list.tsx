import React from 'react';
import {useSelector} from 'react-redux';
import {View} from '@renative';
import {getCraftsByCategory} from '@redux/selectors/craft';
import CraftListCategory from '@components/craft/craft_list_category';

const CraftList = () => {
    const craftsByCategory = useSelector(getCraftsByCategory);
    const renderedCrafts = craftsByCategory.map(({category, crafts}) => (
        <CraftListCategory
            key={'craft_category_' + category}
            category={category}
            crafts={crafts}
        />
    ));

    return (
        <View>
            {renderedCrafts}
        </View>
    );
};

export default CraftList;

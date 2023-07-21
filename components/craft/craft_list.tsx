import React from 'react';
import {useSelector} from 'react-redux';
import {styled} from 'styled-components/native';
import {View} from '@renative';
import {getCraftsByCategory} from '@redux/selectors/craft';
import useFormattedMessage from '@hooking/useFormattedMessage';
import CraftListCategory from '@components/craft/craft_list_category';
import NoResultIndicator from '@components/no_result_indicator';
import EmptyCraftIcon from '@res/empty_craft_icon.svg';

const CraftList = () => {
    const formatMessage = useFormattedMessage();
    const craftsByCategory = useSelector(getCraftsByCategory);
    const renderedCrafts = craftsByCategory.map(({category, crafts}) => (
        <CraftListCategory
            key={'craft_category_' + category}
            category={category}
            crafts={crafts}
        />
    ));

    const noResultText = formatMessage({
        id: 'components.craft_list.no_result.text',
        defaultMessage: 'Nothing at the moment',
    });

    let noResultIndicator;
    if (!craftsByCategory.length) {
        noResultIndicator = (
            <NoResultIndicator
                icon={<StyledEmptyCraftIcon/>}
                textVariant='primary'
                title={noResultText}
            />
        );
    }

    return (
        <View variants={['flex']}>
            {renderedCrafts}
            {noResultIndicator}
        </View>
    );
};

const StyledEmptyCraftIcon = styled(EmptyCraftIcon)(({theme}) => ({
    width: 90,
    height: 90,
    fill: theme.colors.variants['buttonPrimary-dark-3'],
}));

export default CraftList;

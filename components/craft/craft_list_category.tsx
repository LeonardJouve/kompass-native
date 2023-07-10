import React from 'react';
import {View, Text} from '@renative';
import GridList from '@components/grid_list';
import CraftListItem from '@components/craft/craft_list_item';
import type {Craft} from '@typing/craft';

type Props = {
    category: Craft['category'];
    crafts: Craft[];
    size?: number;
    minGap?: number;
};

const CraftListCategory = ({
    category,
    crafts,
    size = 50,
    minGap = 10,
}: Props) => {
    const renderItem = (craft: Craft) => (
        <CraftListItem
            key={'craft_' + craft.name}
            craft={craft}
            size={size}
        />
    );

    return (
        <View>
            <Text variants={['header']}>{category}</Text>
            <GridList
                minGap={minGap}
                size={size}
                items={crafts}
                renderItem={renderItem}
            />
        </View>
    );
};

export default CraftListCategory;

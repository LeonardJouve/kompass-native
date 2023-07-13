import React, {useState} from 'react';
import {View, Text} from '@renative';
import GridList from '@components/grid_list';
import CraftListItem from '@components/craft/craft_list_item';
import type {Craft} from '@typing/craft';

type Props = {
    category: Craft['category'];
    crafts: Craft[];
};

const CraftListCategory = ({
    category,
    crafts,
}: Props) => {
    const [size, setSize] = useState<number>(70);
    const renderItem = (craft: Craft) => (
        <CraftListItem
            key={'craft_' + craft.type}
            craft={craft}
            size={size}
        />
    );

    return (
        <View variants={['column']}>
            <Text variants={['header']}>{category}</Text>
            <GridList
                size={size}
                items={crafts}
                setSize={setSize}
                renderItem={renderItem}
            />
        </View>
    );
};

export default CraftListCategory;

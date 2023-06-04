import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative';
import InventoryList from '@components/inventory/inventory_list';
import type {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Inventory'>;

const Inventory = ({}: Props) => {
    return (
        <View
            variants={['primary', 'flex']}
            padding={{padding: 'm'}}
        >
            <Text variants={['header', 'default']}>{'Inventory'}</Text>
            <InventoryList/>
        </View>
    );
};

export default Inventory;
import React, {useEffect} from 'react';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from '@renative';
import {useAppDispatch} from '@redux/store';
import {inventoryActions} from '@redux/inventory';
import InventoryList from '@components/inventory/inventory_list';
import type {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Inventory'>;

const Inventory = ({}: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(inventoryActions.getItems());
    }, []);

    return (
        <View variants={['primary', 'flex']}>
            <InventoryList/>
        </View>
    );
};

export default Inventory;

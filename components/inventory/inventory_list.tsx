import React, {useEffect} from 'react';
import {SectionList} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@redux/store';
import {inventoryActions} from '@redux/inventory';
import {getInventoryItemsByCategory} from '@redux/selectors/inventory';
import type {GlobalState} from '@typing/global_state';
import InventoryListItem from '@components/inventory/inventory_list_item';
import InventoryListHeader from '@components/inventory/inventory_list_header';

const InventoryList = () => {
    const dispatch = useAppDispatch();
    const inventoryItemsByCategory = useSelector((state: GlobalState) => getInventoryItemsByCategory(state));
    useEffect(() => {
        dispatch(inventoryActions.setInventoryItems({
            test: {
                id: 'test',
                name: 'test',
                category: 'first_category',
            },
            testtesttest: {
                id: 'testtesttest',
                name: 'testtesttest',
                category: 'first_category',
            },
            testtest: {
                id: 'testtest',
                name: 'testtest',
                category: 'second_category',
            },
        }));
    }, []);
    return (
        <SectionList
            sections={inventoryItemsByCategory}
            renderSectionHeader={InventoryListHeader}
            renderItem={InventoryListItem}
            keyExtractor={(item) => `inventory-item-${item.id}`}
        />
    );
};

export default InventoryList;

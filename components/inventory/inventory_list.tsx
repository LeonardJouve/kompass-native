import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@redux/store';
import {inventoryActions} from '@redux/inventory';
import {getInventoryItemsArray} from '@redux/selectors/inventory';
import InventoryListItem from '@components/inventory/inventory_list_item';
import {filterInventoryItemsByCategory} from '@utils/inventory';
import {Filter, InventoryListItemInfoType, type InventoryListItemInfo} from '@typing/inventory';
import InventoryListHeader from '@components/inventory/inventory_list_header';
import InventoryListSeparator from '@components/inventory/inventory_list_separator';

const InventoryList = () => {
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<Filter>(Filter.CATEGORY);
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
    const inventoryItems = useSelector(getInventoryItemsArray);

    const filteredInventoryItems = useMemo(() => {
        switch (filter) {
        case Filter.CATEGORY:
            return filterInventoryItemsByCategory(inventoryItems);
        }
    }, [filter, inventoryItems]);

    const handleSelectItem = (itemId: string) => setSelectedItems({
        ...selectedItems,
        [itemId]: !selectedItems[itemId] ?? true,
    });

    const renderItem = ({item}: ListRenderItemInfo<InventoryListItemInfo>) => {
        switch (item.type) {
        case InventoryListItemInfoType.HEADER:
            return <InventoryListHeader {...item.data}/>;
        case InventoryListItemInfoType.ITEM:
            const itemId = item.data.item.id;
            return (
                <InventoryListItem
                    selected={selectedItems[itemId] ?? false}
                    selectItem={() => handleSelectItem(itemId)}
                    {...item.data}
                />
            );
        case InventoryListItemInfoType.SEPARATOR:
            return <InventoryListSeparator/>;
        }
    };

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
        <FlatList
            data={filteredInventoryItems}
            renderItem={renderItem}
            keyExtractor={(item) => `inventory-item-${item.key}`}
        />
    );
};

export default InventoryList;

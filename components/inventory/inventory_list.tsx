import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@redux/store';
import {inventoryActions} from '@redux/inventory';
import {getInventoryItemsArray} from '@redux/selectors/inventory';
import {View} from '@renative';
import InventoryListItem from '@components/inventory/inventory_list_item';
import InventoryListHeader from '@components/inventory/inventory_list_header';
import InventoryListSeparator from '@components/inventory/inventory_list_separator';
import InventoryItemActions from '@components/inventory/inventory_list_actions';
import InventoryListFilter from '@components/inventory/inventory_list_filter';
import {filterInventoryItemsByCategory} from '@utils/inventory';
import {InventoryFilter, InventoryListItemInfoType, type InventoryListItemInfo, InventoryItem} from '@typing/inventory';

const InventoryList = () => {
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<InventoryFilter>(InventoryFilter.CATEGORY);
    const [selectedItems, setSelectedItems] = useState<Array<InventoryItem['id']>>([]);
    const inventoryItems = useSelector(getInventoryItemsArray);

    const filteredInventoryItems = useMemo(() => {
        let filteredList: InventoryListItemInfo[];
        switch (filter) {
        case InventoryFilter.CATEGORY:
            filteredList = filterInventoryItemsByCategory(inventoryItems);
            break;
        }
        filteredList.unshift({
            type: InventoryListItemInfoType.FILTER,
            key: 'inventory_list_filter_bar',
            data: null,
        });
        return filteredList;
    }, [filter, inventoryItems]);

    const handleSelectItem = (itemId: InventoryItem['id']) => {
        let newSelectedItems = [...selectedItems];
        const itemIndex = newSelectedItems.indexOf(itemId);
        if (itemIndex !== -1) {
            newSelectedItems.splice(itemIndex, 1);
        } else {
            newSelectedItems.push(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    const renderItem = ({item, index}: ListRenderItemInfo<InventoryListItemInfo>) => {
        switch (item.type) {
        case InventoryListItemInfoType.FILTER:
            return (
                <InventoryListFilter
                    filter={filter}
                    setFilter={setFilter}
                />
            );
        case InventoryListItemInfoType.HEADER:
            return (
                <InventoryListHeader
                    index={index}
                    {...item.data}
                />
            );
        case InventoryListItemInfoType.ITEM:
            const itemId = item.data.item.id;
            return (
                <InventoryListItem
                    selected={selectedItems.includes(itemId)}
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
            t: {
                id: 't',
                name: 't',
                category: 'second_category',
            },
            te: {
                id: 'te',
                name: 'te',
                category: 'second_category',
            },
            tes: {
                id: 'tes',
                name: 'tes',
                category: 'second_category',
            },
            testt: {
                id: 'testt',
                name: 'testt',
                category: 'second_category',
            },
            ttesesttest: {
                id: 'ttesesttest',
                name: 'ttesesttest',
                category: 'second_category',
            },
            dwa: {
                id: 'dwa',
                name: 'dwa',
                category: 'second_category',
            },
            dwas: {
                id: 'dwas',
                name: 'dwas',
                category: 'second_category',
            },
        }));
    }, []);

    return (
        <View variants={['relative', 'flex']}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredInventoryItems}
                renderItem={renderItem}
                keyExtractor={(item) => `inventory-item-${item.key}`}
            />
            <InventoryItemActions
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
        </View>
    );
};

export default InventoryList;

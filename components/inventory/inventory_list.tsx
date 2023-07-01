import React, {useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useSelector} from 'react-redux';
import {styled} from 'styled-components/native';
import {getInventoryItemsArray} from '@redux/selectors/inventory';
import {View} from '@renative';
import useFormattedMessage from '@hooking/useFormattedMessage';
import NoResultIndicator from '@components/no_result_indicator';
import InventoryListItem from '@components/inventory/inventory_list_item';
import InventoryListHeader from '@components/inventory/inventory_list_header';
import InventoryListSeparator from '@components/inventory/inventory_list_separator';
import InventoryItemActions from '@components/inventory/inventory_list_actions';
import InventoryListFilter from '@components/inventory/inventory_list_filter';
import {filterInventoryItemsByAmount, filterInventoryItemsByCategory} from '@utils/inventory';
import {InventoryFilter, InventoryOrder, InventoryListItemInfoType, type InventoryListItemInfo, type Item} from '@typing/inventory';
import EmptyInventoryIcon from '@res/empty_inventory_icon.svg';

const InventoryList = () => {
    const formatMessage = useFormattedMessage();
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<InventoryFilter>(InventoryFilter.CATEGORY);
    const [order, setOrder] = useState<InventoryOrder>(InventoryOrder.ASCENDING);
    const [selectedItems, setSelectedItems] = useState<Array<Item['item_id']>>([]);
    const inventoryItems = useSelector(getInventoryItemsArray);

    const filteredInventoryItems = useMemo(() => {
        let filteredList: InventoryListItemInfo[];
        switch (filter) {
        case InventoryFilter.CATEGORY:
            filteredList = filterInventoryItemsByCategory(inventoryItems, search, order);
            break;
        case InventoryFilter.AMOUNT:
            filteredList = filterInventoryItemsByAmount(inventoryItems, search, order);
        }
        if (!filteredList.length) {
            filteredList.push({
                type: InventoryListItemInfoType.EMPTY,
                key: 'inventory_list_empty',
                data: null,
            });
        }
        filteredList.unshift({
            type: InventoryListItemInfoType.FILTER,
            key: 'inventory_list_filter_bar',
            data: null,
        });
        return filteredList;
    }, [search, filter, order, inventoryItems]);

    const handleSelectItem = (itemId: Item['item_id']) => {
        let newSelectedItems = [...selectedItems];
        const itemIndex = newSelectedItems.indexOf(itemId);
        if (itemIndex !== -1) {
            newSelectedItems.splice(itemIndex, 1);
        } else {
            newSelectedItems.push(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    const resetSelectedItems = () => setSelectedItems([]);

    const renderItem = ({item}: ListRenderItemInfo<InventoryListItemInfo>) => {
        switch (item.type) {
        case InventoryListItemInfoType.FILTER:
            return (
                <InventoryListFilter
                    search={search}
                    filter={filter}
                    order={order}
                    setSearch={setSearch}
                    setFilter={setFilter}
                    setOrder={setOrder}
                />
            );
        case InventoryListItemInfoType.HEADER:
            return <InventoryListHeader {...item.data}/>;
        case InventoryListItemInfoType.ITEM:
            const itemId = item.data.item.item_id;
            return (
                <InventoryListItem
                    selected={selectedItems.includes(itemId)}
                    selectItem={() => handleSelectItem(itemId)}
                    {...item.data}
                />
            );
        case InventoryListItemInfoType.SEPARATOR:
            return <InventoryListSeparator {...item.data}/>;
        case InventoryListItemInfoType.EMPTY:
            return (
                <NoResultIndicator
                    icon={<StyledEmptyInventoryIcon/>}
                    textVariant='primary'
                    title={noResultText}
                />
            );
        }
    };

    let noResultText = formatMessage({
        id: 'components.inventory_list.no_result.text',
        defaultMessage: 'Nothing at the moment',
    });
    if (search && inventoryItems.length) {
        noResultText = formatMessage({
            id: 'components.inventory_list.no_result.search',
            defaultMessage: 'No item match the current search',
        });
    }

    return (
        <View
            variants={['secondary', 'relative', 'flex']}
            padding={{paddingHorizontal: 's'}}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredInventoryItems}
                renderItem={renderItem}
                keyExtractor={(item) => `inventory-item-${item.key}`}
            />
            <InventoryItemActions
                selectedItems={selectedItems}
                resetSelectedItems={resetSelectedItems}
            />
        </View>
    );
};

const StyledEmptyInventoryIcon = styled(EmptyInventoryIcon)(({theme}) => ({
    width: 90,
    height: 90,
    fill: theme.colors.variants['buttonPrimary-dark-3'],
}));

export default InventoryList;

import React, {useRef} from 'react';
import {StyleSheet, TextInput as NativeTextInput, GestureResponderEvent} from 'react-native'; // eslint-disable-line no-restricted-imports
import styled from 'styled-components/native';
import {Button, TextInput, View} from '@renative';
import useFormattedMessage from '@hooking/useFormattedMessage';
import InventoryListFilterMenu from '@components/inventory/inventory_list_filter_menu';
import {InventoryFilter, InventoryOrder} from '@typing/inventory';
import SearchIcon from '@res/search_icon.svg';
import CloseIcon from '@res/close_icon.svg';
import OrderIcon from '@res/order_icon.svg';

type Props = {
    search: string;
    filter: InventoryFilter;
    order: InventoryOrder,
    setFilter: (filter: InventoryFilter) => void;
    setOrder: (order: InventoryOrder) => void;
    setSearch: (search: string) => void;
}

const InventoryListFilter = ({search, filter, order, setSearch, setFilter, setOrder}: Props) => {
    const formatMessage = useFormattedMessage();
    const searchInputRef = useRef<NativeTextInput>(null);

    const searchPlaceholder = formatMessage({
        id: 'components.inventory_list.search.placeholder',
        defaultMessage: 'Search items',
    });

    const handleSearchTouch = () => searchInputRef.current?.focus();

    const handleClearSearch = (e: GestureResponderEvent) => {
        e.stopPropagation();
        searchInputRef.current?.clear();
        searchInputRef.current?.blur();
        setSearch('');
    };

    const handleOrderPress = () => setOrder(order === InventoryOrder.ASCENDING ? InventoryOrder.DESCENDING : InventoryOrder.ASCENDING);

    const isClearable = Boolean(search.length);

    return (
        <View
            variants={['secondary']}
            margin={{marginVertical: 'm'}}
            style={styles.container}
        >
            <View
                variants={['primary', 'row', 'rounded', 'alignCenter']}
                padding={{paddingHorizontal: 'm', paddingVertical: 'xs'}}
                style={styles.searchContainer}
            >
                <View
                    variants={['row', 'alignCenter', 'flex']}
                    onTouchEnd={handleSearchTouch}
                >
                    <StyledSearchIcon/>
                    <View variants={['flex']}>
                        <TextInput
                            ref={searchInputRef}
                            variants={['primary', 'rounded']}
                            style={styles.searchInput}
                            placeholder={searchPlaceholder}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
                <View variants={['row', 'alignCenter']}>
                    {isClearable && (
                        <StyledClearSearchView onTouchEnd={handleClearSearch}>
                            <StyledCloseIcon/>
                        </StyledClearSearchView>
                    )}
                    <InventoryListFilterMenu
                        filter={filter}
                        setFilter={setFilter}
                    />
                    <Button onPress={handleOrderPress}>
                        <StyledOrderIcon/>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 59,
    },
    searchContainer: {
        gap: 2,
    },
    searchInput: {
        borderWidth: 0,
    },
});

const StyledSearchIcon = styled(SearchIcon)(({theme}) => ({
    width: 20,
    height: 20,
    fill: theme.colors.viewSecondary,
}));

const StyledClearSearchView = styled(View)(({theme}) => ({
    width: 20,
    height: 20,
    backgroundColor: theme.colors.viewSecondary,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledCloseIcon = styled(CloseIcon)(({theme}) => ({
    width: 14,
    height: 14,
    fill: theme.colors.viewPrimary,
}));

const StyledOrderIcon = styled(OrderIcon)(({theme}) => ({
    width: 20,
    height: 20,
    fill: theme.colors.viewSecondary,
}));

export default InventoryListFilter;

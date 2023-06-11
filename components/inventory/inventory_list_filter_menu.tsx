import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Button} from '@renative';
import useFormattedMessage from '@hooking/useFormattedMessage';
import MenuModal, {MenuItem} from '@components/menu';
import {InventoryFilter} from '@typing/inventory';
import SortIcon from '@res/sort_icon.svg';

type Props = {
    filter: InventoryFilter;
    setFilter: (filter: InventoryFilter) => void;
};

const InventoryListFilterMenu = ({filter, setFilter}: Props) => {
    const formatMessage = useFormattedMessage();
    const [open, setOpen] = useState<boolean>(false);

    const handleItemPress = (newFilter: InventoryFilter) => {
        setFilter(newFilter);
        setOpen(false);
    };

    const button = (
        <Button onPress={() => setOpen(true)}>
            <StyledSortIcon/>
        </Button>
    );

    const headerText = formatMessage({
        id: 'components.inventory_list.filter.menu.header',
        defaultMessage: 'Sort by',
    });

    const items: MenuItem[] = [
        {text: formatMessage({id: 'components.inventory_list.filter.menu.category', defaultMessage: 'Category'}), selected: filter === InventoryFilter.CATEGORY, onPress: () => handleItemPress(InventoryFilter.CATEGORY)},
    ];

    return (
        <MenuModal
            open={open}
            name='inventory-list-filter-menu'
            position='bottom-end'
            button={button}
            header={headerText}
            items={items}
            handleOpen={setOpen}
        />
    );
};

const StyledSortIcon = styled(SortIcon)(({theme}) => ({
    width: 20,
    height: 20,
    fill: theme.colors.viewSecondary,
}));

export default InventoryListFilterMenu;

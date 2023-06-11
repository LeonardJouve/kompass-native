import React, {useState} from 'react';
import {InventoryFilter} from '@typing/inventory';
import {Button} from '@renative';
import useTheme from '@hooking/useTheme';
import Menu, {type MenuItem} from '@components/menu';

// REMOVE
import CloseIcon from '@res/close_icon.svg';

type Props = {
    filter: InventoryFilter;
    setFilter: (filter: InventoryFilter) => void;
};

const getFilterIcon = (filter: InventoryFilter) => {
    switch (filter) {
    case InventoryFilter.CATEGORY:
        return CloseIcon;
    }
};

const InventoryListFilterMenu = ({filter, setFilter}: Props) => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenMenu = () => setOpen(!open);

    const Icon = getFilterIcon(filter);

    const button = (
        <Button
            variants={['primary']}
            onPress={handleOpenMenu}
        >
            <Icon
                width={20}
                height={20}
                fill={theme.colors.viewPrimary}
            />
        </Button>
    );

    const menuItems: MenuItem[] = [
        {text: 'item', selected: false, onPress: console.log},
    ];

    return (
        <Menu
            open={open}
            placement='bottom-end'
            name='inventory-list-filter'
            button={button}
            header={'test'}
            items={menuItems}
        />
    );
};


export default InventoryListFilterMenu;

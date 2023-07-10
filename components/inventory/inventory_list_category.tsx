import React from 'react';
import {Text, View} from '@renative';
import {styled} from 'styled-components/native';
import useFormattedMessage from '@hooking/useFormattedMessage';
import InventoryListItem from '@components/inventory/inventory_list_item';
import {changeColorBrightness} from '@utils/renative';
import type {InventoryCategory, Item} from '@typing/inventory';

type Props = {
    category: InventoryCategory;
    items: Item[];
    selectedItems: Array<Item['item_id']>;
    selectItem: (itemId: Item['item_id']) => void;
};

const InventoryListCategory = ({category, items, selectedItems, selectItem}: Props) => {
    const formatMessage = useFormattedMessage();

    const header = formatMessage({
        id: `components.inventory_list.header.category_${category}`,
        defaultMessage: category,
    });

    const renderedItems = items.map((item) => {
        const itemId = item.item_id;
        return (
            <InventoryListItem
                key={'inventory_category_' + itemId}
                selected={selectedItems.includes(itemId)}
                selectItem={() => selectItem(itemId)}
                item={item}
            />
        );
    });

    return (
        <StyledCategoryView
            variants={['column']}
            margin={{marginTop: 'xs'}}
            padding={{paddingTop: 'm'}}
        >
            <Text
                variants={['default', 'header', 'center']}
            >
                {header}
            </Text>
            <StyledContentView
                variants={['primary', 'fullWidth', 'column']}
                padding={{padding: 'm'}}
            >
                {renderedItems}
            </StyledContentView>
        </StyledCategoryView>
    );
};

const StyledCategoryView = styled(View)(({theme}) => ({
    borderRadius: theme.spacing.xl,
    backgroundColor: changeColorBrightness(theme.colors.viewPrimary, -0.07),
}));

const StyledContentView = styled(View)(({theme}) => ({
    borderTopStartRadius: theme.spacing.l,
    borderTopEndRadius: theme.spacing.l,
    borderBottomStartRadius: theme.spacing.xl,
    borderBottomEndRadius: theme.spacing.xl,
}));

export default InventoryListCategory;

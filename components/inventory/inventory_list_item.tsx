import React from 'react';
import {StyleSheet} from 'react-native';
import {styled} from 'styled-components/native';
import {Text, Button} from '@renative';
import InventoryItemIcons from '@components/icons/inventory_item_icons';
import {changeColorBrightness} from '@utils/renative';
import CheckIcon from '@res/check_icon.svg';
import type {Item} from '@typing/inventory';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    item: Item;
    selected: boolean;
    selectItem: () => void;
};

const InventoryListItem = ({item, selected, selectItem}: Props) => {
    const Icon = InventoryItemIcons[item.item_id] ?? InventoryItemIcons.not_found;
    return (
        <StyledItemButton
            variants={['relative', 'row', 'alignCenter']}
            padding={{paddingHorizontal: 'l', paddingVertical: 's'}}
            onLongPress={selectItem}
            styled={{selected}}
        >
            <Text variants={['default']}>{item.amount}</Text>
            <Icon
                width={30}
                height={30}
            />
            <Text variants={['default']}>{item.name}</Text>
            {selected && (
                <Button
                    variants={['primary', 'absolute']}
                    padding={{padding: 'xs'}}
                    onPress={selectItem}
                    style={[styles.selectButton]}
                >
                    <StyledCheckIcon/>
                </Button>
            )}
        </StyledItemButton>
    );
};

type StyledItemProps = StyledComponentProps<{
    selected: boolean;
}>;

const StyledItemButton = styled(Button)<StyledItemProps>(({styled: {selected}, theme}) => ({
    backgroundColor: selected ? changeColorBrightness(theme.colors.viewPrimary, -0.03) : theme.colors.viewPrimary,
    borderRadius: theme.spacing.l,
}));

const styles = StyleSheet.create({
    selectButton: {
        width: 20,
        height: 20,
        right: 10,
        top: '50%',
        borderRadius: 10,
    },
});

const StyledCheckIcon = styled(CheckIcon)(({theme}) => ({
    fill: theme.colors.viewPrimary,
}));

export default InventoryListItem;

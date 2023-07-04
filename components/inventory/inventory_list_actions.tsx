import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {styled} from 'styled-components/native';
import {useAppDispatch} from '@redux/store';
import {inventoryActions} from '@redux/inventory';
import {Text, View} from '@renative';
import {useCenterAbsolute} from '@hooking/useCenterAbsolute';
import SplitButton from '@components/split_button';
import type {Item} from '@typing/inventory';
import TrashIcon from '@res/trash_icon.svg';
import MinusIcon from '@res/minus_icon.svg';
import PlusIcon from '@res/plus_icon.svg';

type Props = {
    selectedItems: Array<Item['item_id']>;
    selectedItemMaxAmount?: number;
    resetSelectedItems: () => void;
};

const InventoryItemActions = ({selectedItems, selectedItemMaxAmount, resetSelectedItems}: Props) => {
    const {translateX, onLayout} = useCenterAbsolute();
    const dispatch = useAppDispatch();
    const [selectedItemAmount, setSelectedItemAmount] = useState(selectedItemMaxAmount);

    useEffect(() => {
        setSelectedItemAmount(selectedItemMaxAmount);
    }, [selectedItemMaxAmount]);

    const handleSelectAmount = (modifier: number) => {
        if (!selectedItemMaxAmount || !selectedItemAmount) {
            return;
        }
        const newSelectedItemAmount = selectedItemAmount + modifier;
        if (newSelectedItemAmount > 0 && newSelectedItemAmount <= selectedItemMaxAmount) {
            setSelectedItemAmount(newSelectedItemAmount);
        }
    };

    const handleDelete = () => {
        const amount = selectedItems.length === 1 ? selectedItemAmount : undefined;
        selectedItems.forEach((selectedItem) => {
            dispatch(inventoryActions.deleteItem({itemId: selectedItem, amount}));
        });
        resetSelectedItems();
    };

    const selectOptions = [];

    if (selectedItems.length === 1) {
        const renderedSelectedAmount = (
            <View
                variants={['centered']}
                style={styles.selectedAmount}
            >
                <StyledAmountText variants={['header']}>
                    {selectedItemAmount}
                </StyledAmountText>
            </View>
        );
        selectOptions.push(
            {icon: MinusIcon, onPress: () => handleSelectAmount(-1)},
            {content: renderedSelectedAmount},
            {icon: PlusIcon, onPress: () => handleSelectAmount(1)},
        );
    }

    if (!selectedItems.length) {
        return null;
    }

    return (
        <View
            variants={['absolute']}
            style={styles.container}
        >
            <View
                onLayout={onLayout}
                style={{transform: [{translateX}]}}
            >
                <SplitButton
                    name='inventory_list_actions'
                    variants={['elevationHigh']}
                    size={30}
                    options={[
                        ...selectOptions,
                        {icon: TrashIcon, isDangerous: true, onPress: handleDelete},
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        bottom: 10,
        left: '50%',
    },
    selectedAmount: {
        width: 30,
        height: 30,
    },
});

const StyledAmountText = styled(Text)(({theme}) => ({
    color: theme.colors.viewSecondary,
}));

export default InventoryItemActions;


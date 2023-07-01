import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppDispatch} from '@redux/store';
import {inventoryActions} from '@redux/inventory';
import {View} from '@renative';
import SplitButton from '@components/split_button';
import {useCenterAbsolute} from '@hooking/useCenterAbsolute';
import TrashIcon from '@res/trash_icon.svg';
import type {Item} from '@typing/inventory';

type Props = {
    selectedItems: Array<Item['item_id']>;
    resetSelectedItems: () => void;
};

const InventoryItemActions = ({selectedItems, resetSelectedItems}: Props) => {
    const {translateX, onLayout} = useCenterAbsolute();
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(inventoryActions.removeInventoryItems(selectedItems));
        resetSelectedItems();
    };

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
                    size={30}
                    options={[
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
});

export default InventoryItemActions;


import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {Button, View} from '@renative';
import Rest from '@api/rest';
import {getModalProps, isModalOpen} from '@redux/selectors/modal';
import {getInventoryItemsArray} from '@redux/selectors/inventory';
import GenericModal from '@components/modals/generic_modal';
import CraftBlueprintItem from '@components/craft/craft_blueprint_item';
import {ModalIdentifiers, type CraftModalProps} from '@typing/modals';
import type {GlobalState} from '@typing/global_state';
import type {AvailableItem} from '@typing/inventory';

const CraftModal = () => {
    const isCraftModalOpen = useSelector((state: GlobalState) => isModalOpen(state, ModalIdentifiers.CRAFT_MODAL));
    const {craft} = useSelector(getModalProps) as CraftModalProps['props'];
    const items = useSelector(getInventoryItemsArray);
    const [selectedItems, setSelectedItems] = useState<Record<number, number>>({});
    const [amount, setAmount] = useState<number>(1);
    const [result, setResult] = useState<AvailableItem|null>(null);

    const filteredItems = useMemo(() => {
        // Deep clone items
        const newItems = items.map((item) => ({...item}));
        Object.values(selectedItems).forEach((itemId) => {
            const newItem = newItems.find((item) => item.item_id === itemId);
            if (newItem) {
                newItem.amount -= amount;
            }
        });
        return newItems.filter((item) => item.amount);
    }, [items, selectedItems]);

    const getResultPreview = async () => {
        const selectedItemsId = Object.values(selectedItems);
        if (craft && selectedItemsId.length === craft.recipe.length) {
            const {data, error} = await Rest.getCraftPreview(craft.craft_id, selectedItemsId);
            if (error) {
                return;
            }
            setResult(data);
        }
    };

    useEffect(() => {
        getResultPreview();
    }, [selectedItems]);

    useEffect(() => {
        return () => {
            setSelectedItems({});
            setResult(null);
            setAmount(1);
        };
    }, [isCraftModalOpen]);

    if (!isCraftModalOpen) {
        return null;
    }

    const handleSelectItem = (index: number, itemId: number) => setSelectedItems({
        ...selectedItems,
        [index]: itemId,
    });

    const craftBlueprintItems = craft.recipe.map((ingredient, index) => (
        <CraftBlueprintItem
            key={'craft_blueprint_item' + index}
            ingredient={ingredient}
            items={filteredItems.filter(({type}) => type === ingredient.type)}
            selectedItemId={selectedItems[index]}
            setSelectedItemId={(itemId: number) => handleSelectItem(index, itemId)}
        />
    ));

    const resultUri = result ? Rest.getItemImageRoute(result.id) : Rest.getItemPreviewImageRoute(craft.type);

    const content = (
        <View>
            <View variants={['row', 'alignCenter']}>
                <View variants={['flex', 'column']}>
                    {craftBlueprintItems}
                </View>
                <View>
                    {/* <ProgressBar/> craft progress bar*/}
                </View>
                <View variants={['flex', 'column']}>
                    <Button
                        variants={['centered', 'rounded', 'bordered']}
                        style={styles.result}
                    >
                        <FastImage
                            source={{
                                uri: resultUri,
                                headers: {Authorization: `Bearer ${Rest.apiToken}`},
                            }}
                            style={styles.resultImage}
                        />
                    </Button>
                </View>
            </View>
            {/* <Slider/> amount slider */}
        </View>
    );
    return (
        <GenericModal
            modalId={ModalIdentifiers.CRAFT_MODAL}
            header={craft.type}
            content={content}
            isCancelable={true}
        />
    );
};

const styles = StyleSheet.create({
    result: {
        aspectRatio: 1,
    },
    resultImage: {
        flex: 1,
        aspectRatio: 1,
    },
});

export default CraftModal;

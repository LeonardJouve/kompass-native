import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {Button, View} from '@renative';
import Rest from '@api/rest';
import {useAppDispatch} from '@redux/store';
import {modalActions} from '@redux/modal';
import {getModalProps, isModalOpen} from '@redux/selectors/modal';
import {getInventoryItemsArray} from '@redux/selectors/inventory';
import useFormattedMessage from '@hooking/useFormattedMessage';
import GenericModal from '@components/modals/generic_modal';
import CraftBlueprintItem from '@components/craft/craft_blueprint_item';
import ProgressBar from '@components/progress_bar';
import Slider from '@components/slider';
import {ModalIdentifiers, type CraftModalProps} from '@typing/modals';
import type {GlobalState} from '@typing/global_state';
import type {AvailableItem} from '@typing/inventory';

const TIMER_PER_TIER = 3000;

const CraftModal = () => {
    const dispatch = useAppDispatch();
    const isCraftModalOpen = useSelector((state: GlobalState) => isModalOpen(state, ModalIdentifiers.CRAFT_MODAL));
    const {craft} = useSelector(getModalProps) as CraftModalProps['props'];
    const items = useSelector(getInventoryItemsArray);
    const formatMessage = useFormattedMessage();
    const [selectedItems, setSelectedItems] = useState<Record<number, number>>({});
    const [maxAmount, setMaxAmount] = useState<number>(0);
    const [amount, setAmount] = useState<number>(1);
    const [result, setResult] = useState<AvailableItem|null>(null);
    const [isCrafting, setIsCrafting] = useState<boolean>(false);
    const timerInMs = result ? result.tier * TIMER_PER_TIER * amount : 0;

    const filteredItems = useMemo(() => {
        const newItems = items.map((item) => ({...item}));
        Object.values(selectedItems).forEach((itemId) => {
            const newItem = newItems.find((item) => item.item_id === itemId);
            if (newItem) {
                newItem.amount -= amount;
            }
        });
        return newItems.filter((item) => item.amount);
    }, [items, selectedItems]);

    const getMaxAmount = () => {
        const newSelectedItems = Object.values(selectedItems);
        const newItems = items.map((item) => ({...item}));
        let newAmount = 0;

        while (!newItems.find((item) => item.amount <= 0)) {
            newAmount++;
            newSelectedItems.forEach((selectedItem) => {
                const newItem = newItems.find((item) => item.item_id === selectedItem);
                if (!newItem) {
                    return;
                }
                newItem.amount--;
            });
        }
        setMaxAmount(newAmount - 1);
    };

    const getResultPreview = async () => {
        const selectedItemsId = Object.values(selectedItems);
        if (craft && selectedItemsId.length === craft.recipe.length) {
            const {data, error} = await Rest.getCraftPreview(craft.craft_id, selectedItemsId);
            if (error) {
                setResult(null);
                setMaxAmount(0);
                return;
            }
            setResult(data);
            getMaxAmount();
            return;
        }
        setMaxAmount(0);
    };

    useEffect(() => {
        getResultPreview();
    }, [selectedItems]);

    useEffect(() => {
        return () => {
            setSelectedItems({});
            setResult(null);
            setMaxAmount(0);
            setAmount(1);
            setIsCrafting(false);
        };
    }, [isCraftModalOpen]);

    if (!isCraftModalOpen) {
        return null;
    }

    const handleSelectItem = (index: number, itemId: number) => setSelectedItems({
        ...selectedItems,
        [index]: itemId,
    });

    const handleCraft = () => {
        setIsCrafting(true);
    };

    const onCraft = () => {
        dispatch(modalActions.closeModal(ModalIdentifiers.CRAFT_MODAL));
    };

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

    const confirmText = formatMessage({
        id: 'components.craft_modal.confirm',
        defaultMessage: 'Craft',
    });

    const content = (
        <View variants={['column']}>
            <View
                variants={['row', 'alignCenter']}
                style={styles.blueprint}
            >
                <View variants={['flex', 'column']}>
                    {craftBlueprintItems}
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
            {maxAmount > 1 && (
                <Slider
                    max={maxAmount}
                    disabled={isCrafting}
                    setAmount={setAmount}
                />
            )}
            <ProgressBar
                show={isCrafting}
                timerInMs={timerInMs}
                onComplete={onCraft}
            />
        </View>
    );

    return (
        <GenericModal
            modalId={ModalIdentifiers.CRAFT_MODAL}
            header={craft.type}
            content={content}
            confirmText={confirmText}
            isConfirmDisabled={isCrafting}
            isClosable={true}
            isCancelable={isCrafting}
            closeOnConfirm={false}
            onConfirm={handleCraft}
        />
    );
};

const styles = StyleSheet.create({
    blueprint: {
        gap: 40,
    },
    result: {
        aspectRatio: 1,
    },
    resultImage: {
        flex: 1,
        aspectRatio: 1,
    },
});

export default CraftModal;

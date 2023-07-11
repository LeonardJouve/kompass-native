import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Text, View} from '@renative';
import {getModalProps, isModalOpen} from '@redux/selectors/modal';
import GenericModal from '@components/modals/generic_modal';
import CraftBlueprintItem from '@components/craft/craft_blueprint_item';
import {ModalIdentifiers, type CraftModalProps} from '@typing/modals';
import type {GlobalState} from '@typing/global_state';

const CraftModal = () => {
    const isCraftModalOpen = useSelector((state: GlobalState) => isModalOpen(state, ModalIdentifiers.CRAFT_MODAL));
    const {craft} = useSelector(getModalProps) as CraftModalProps['props'];

    if (!isCraftModalOpen) {
        return null;
    }

    const craftBlueprintItems = craft.recipe.map((ingredient, index) => (
        <CraftBlueprintItem
            key={'craft_blueprint_item' + index}
            ingredient={ingredient}
        />
    ));

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
                        <Text>
                            {'result'}
                        </Text>
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
        backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
    },
});

export default CraftModal;

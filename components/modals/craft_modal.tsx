import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from '@renative';
import {getModalProps, isModalOpen} from '@redux/selectors/modal';
import GenericModal from '@components/modals/generic_modal';
import {ModalIdentifiers, type CraftModalProps} from '@typing/modals';
import type {GlobalState} from '@typing/global_state';

const CraftModal = () => {
    const isCraftModalOpen = useSelector((state: GlobalState) => isModalOpen(state, ModalIdentifiers.CRAFT_MODAL));
    const {craft} = useSelector(getModalProps) as CraftModalProps['props'];

    if (!isCraftModalOpen) {
        return null;
    }

    const content = (
        <View>
            <Text>
                {craft.name}
            </Text>
        </View>
    );
    return (
        <GenericModal
            modalId={ModalIdentifiers.CRAFT_MODAL}
            content={content}
            isCancelable={true}
        />
    );
};

export default CraftModal;

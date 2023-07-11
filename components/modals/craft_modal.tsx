import React from 'react';
import {Text} from '@renative';
import GenericModal from '@components/modals/generic_modal';
import {ModalIdentifiers} from '@typing/modals';

type Props = {

};

const CraftModal = ({}: Props) => {
    const content = (
        <Text>
            {'Craft modal'}
        </Text>
    );
    return (
        <GenericModal
            modalId={ModalIdentifiers.CRAFT_MODAL}
            content={content}
        />
    );
};

export default CraftModal;

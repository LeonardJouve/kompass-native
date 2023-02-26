import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@redux/store';
import {Button, Text, View} from '@renative/index';
import {modalActions} from '@redux/reducers/modal';
import {isModalOpen} from '@redux/selectors/modal';
import {GlobalState} from '@typing/global_state';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = {
    modalId: string;
    isCancelable: boolean;
    content: JSX.Element | string;
    header?: JSX.Element | string;
    footer?: JSX.Element;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

const GenericModal = ({modalId, isCancelable, content, header, footer, onConfirm, onCancel, confirmText, cancelText}: Props) => {
    const dispatch = useAppDispatch();
    const visible = useSelector((state: GlobalState) => isModalOpen(state, modalId));
    const formatMessage = useFormattedMessage();

    const closeModal = () => dispatch(modalActions.closeModal(modalId));

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        closeModal();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        closeModal();
    };

    let confirmButtonText = confirmText ?? formatMessage({id: 'components.generic_modal.confirm', defaultMessage: 'Confirm'});
    const confirmButton = (
        <Button
            variants={['primary']}
            textVariants={['primary']}
            text={confirmButtonText}
            onPress={handleConfirm}
        />
    );

    let cancelButtonText = cancelText ?? formatMessage({id: 'components.generic_modal.cancel', defaultMessage: 'Cancel'});
    let cancelButton = <View/>;
    if (isCancelable) {
        cancelButton = (
            <Button
                variants={['secondary']}
                textVariants={['secondary']}
                text={cancelButtonText}
                onPress={handleCancel}
            />
        );
    }

    let headerView;
    if (header) {
        if (typeof header === 'string') {
            headerView = (
                <Text variants={['primary', 'header']}>{header}</Text>
            );
        } else {
            headerView = header;
        }
    }

    let contentView;
    if (content) {
        if (typeof content === 'string') {
            contentView = <Text variants={['primary']}>{content}</Text>;
        } else {
            contentView = content;
        }
    }

    let footerView = footer ?? (
        <View
            variants={['row']}
            style={style.footer}
            padding={{paddingHorizontal: 'xl', paddingBottom: 's'}}
        >
            {cancelButton}
            {confirmButton}
        </View>
    );

    return (
        <View>
            <Modal
                animationType='slide'
                visible={visible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <View
                    variants={['centered']}
                    margin={{margin: 'm'}}
                >
                    <View variants={['primary', 'rounded', 'elevationHigh', 'column']}>
                        <View
                            variants={['secondary', 'elevationLow']}
                            padding={{paddingHorizontal: 'xl', paddingVertical: 'xs'}}
                            style={style.header}
                        >
                            {headerView}
                        </View>
                        <View
                            variants={['primary']}
                            padding={{paddingHorizontal: 'xl'}}
                        >
                            {contentView}
                        </View>
                        {footerView}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const style = StyleSheet.create({
    header: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    footer: {
        justifyContent: 'space-between',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
});

export default GenericModal;

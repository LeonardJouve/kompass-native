import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {modalActions} from '@redux/reducers/modal';
import {isModalOpen} from '@redux/selectors/modal';
import {GlobalState} from '@typing/global_state';

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
    const dispatch = useDispatch();
    const visible = useSelector((state: GlobalState) => isModalOpen(state, modalId));

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

    let confirmButtonText = confirmText ?? 'Confirm';
    const confirmButton = (
        <Button title={confirmButtonText} onPress={handleConfirm} color={style.header.backgroundColor}/>
    );

    let cancelButtonText = cancelText ?? 'Cancel';
    let cancelButton = <View/>;
    if (isCancelable) {
        cancelButton = (
            <Button title={cancelButtonText} onPress={handleCancel} color={style.header.backgroundColor}/>
        );
    }

    let headerView;
    if (header) {
        if (typeof header === 'string') {
            headerView = (
                <Text style={style.headerText}>{header}</Text>
            );
        } else {
            headerView = header;
        }
    }

    let contentView;
    if (content) {
        if (typeof content === 'string') {
            contentView = <Text>{content}</Text>;
        } else {
            contentView = content;
        }
    }

    let footerView = footer ?? (
        <View style={style.footer}>
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
                <View style={[style.view]}>
                    <View style={[style.modal]}>
                        <View style={style.header}>
                            {headerView}
                        </View>
                        <View style={style.content}>
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
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 8,
        gap: 10,
    },
    header: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
        elevation: 3,
        backgroundColor: '#2596be',
    },
    headerText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    content: {
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    footer: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingBottom: 15,
    },
});

export default GenericModal;

import React from 'react';
import {Modal, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {styled} from 'styled-components/native';
import {useAppDispatch} from '@redux/store';
import {modalActions} from '@redux/modal';
import {isModalOpen} from '@redux/selectors/modal';
import {Button, Text, View} from '@renative';
import useFormattedMessage from '@hooking/useFormattedMessage';
import {ModalIdentifiers} from '@typing/modals';
import type {GlobalState} from '@typing/global_state';
import type {StyledComponentProps} from '@typing/styled';
import CloseIcon from '@res/close_icon.svg';

type Props = {
    modalId: ModalIdentifiers;
    content: JSX.Element | string;
    header?: JSX.Element | string;
    footer?: JSX.Element;
    confirmText?: string;
    cancelText?: string;
    isCancelable?: boolean;
    isClosable?: boolean;
    isConfirmDisabled?: boolean;
    closeOnConfirm?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const GenericModal = ({
    modalId,
    content,
    header,
    footer,
    confirmText,
    cancelText,
    isCancelable,
    isClosable,
    isConfirmDisabled,
    closeOnConfirm = true,
    onConfirm,
    onCancel,
}: Props) => {
    const dispatch = useAppDispatch();
    const visible = useSelector((state: GlobalState) => isModalOpen(state, modalId));
    const formatMessage = useFormattedMessage();

    const closeModal = () => dispatch(modalActions.closeModal(modalId));

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        if (closeOnConfirm) {
            closeModal();
        }
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
            disabled={isConfirmDisabled}
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

    let close;
    if (isClosable) {
        close = (
            <StyledCloseIcon
                onTouchEnd={handleCancel}
                styled={{header: Boolean(header)}}
            />
        );
    }

    let contentView;
    if (content) {
        if (typeof content === 'string') {
            contentView = <Text variants={['default']}>{content}</Text>;
        } else {
            contentView = content;
        }
    }

    let footerView = footer ?? (
        <View
            variants={['row', 'rounded']}
            padding={{paddingHorizontal: 'xl', paddingBottom: 's'}}
            style={styles.footer}
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
                    variants={['centered', 'flex']}
                    margin={{margin: 'm'}}
                >
                    <View
                        variants={['primary', 'rounded', 'elevationHigh', 'column']}
                        style={styles.modal}
                    >
                        {headerView && (
                            <View
                                variants={['secondary', 'elevationLow', 'rounded']}
                                padding={{paddingHorizontal: 'xl', paddingVertical: 'xs'}}
                                style={styles.header}
                            >
                                {headerView}
                            </View>
                        )}
                        {close}
                        <View padding={{paddingHorizontal: 'xl', paddingVertical: headerView ? 0 : 'm'}}>
                            {contentView}
                        </View>
                        {footerView}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    modal: {
        width: '90%',
    },
    footer: {
        justifyContent: 'space-between',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

type StyledCloseProps = StyledComponentProps<{
    header: boolean;
}>;

const StyledCloseIcon = styled(CloseIcon)<StyledCloseProps>(({styled: {header}, theme}) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    fill: header ? theme.colors.viewPrimary : theme.colors.viewSecondary,
    width: 27,
    height: 27,
    margin: theme.spacing.xs,
}));

export default GenericModal;

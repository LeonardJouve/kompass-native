import React from 'react';
import {useSelector} from 'react-redux';
import {getModalProps} from '@redux/selectors/modal';
import useFormattedMessage from '@hooking/useFormattedMessage';
import GenericModal from '@components/generic_modal';
import {ModalIdentifiers} from '@typing/modals';

const ErrorModal = () => {
    const formatMessage = useFormattedMessage();
    const {data, url, status} = useSelector(getModalProps);
    let error = '';
    if (data) {
        const {id, defaultMessage, message} = data;
        if (id && defaultMessage) {
            error = formatMessage({...data});
        } else if (message) {
            error = message;
        }
    }

    return (
        <GenericModal
            modalId={ModalIdentifiers.ERROR}
            isCancelable={false}
            header={formatMessage({
                id: 'components.error_modal.header',
                defaultMessage: 'error',
            })}
            content={formatMessage({
                id: 'components.error_modal.content',
                defaultMessage: 'An error has occurred, if you encounter a problem, try to restart the application.\n\n{url}: {status}\n{error}',
                values: {
                    error,
                    status: status ?? '',
                    url,
                },
            })}
        />
    );
};

export default ErrorModal;

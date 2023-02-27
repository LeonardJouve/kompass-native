import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@redux/store';
import {getModalProps} from '@redux/selectors/modal';
import useFormattedMessage from '@hooking/useFormattedMessage';
import GenericModal from '@components/generic_modal';
import {ModalIdentifiers} from '@typing/modals';

const ErrorModal = () => {
    const dispatch = useAppDispatch();
    const formatMessage = useFormattedMessage();
    const {id, defaultMessage, values, url} = useSelector(getModalProps);
    const message = formatMessage({
        id,
        defaultMessage,
        values,
    });

    // useEffect(() => {
    //     if (message && url) {
    //         dispatch(sendError(message, url));
    //     }
    // }, [message, url]);

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
                defaultMessage: 'An error has occurred, if you encounter a problem, try to restart the application.\n{url}: {message}',
                values: {
                    message,
                    url,
                },
            })}
        />
    );
};

export default ErrorModal;

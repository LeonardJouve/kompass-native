import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@redux/store';
import {errorActions} from '@redux/error';
import {getError} from '@redux/selectors/error';
import {Text} from '@renative';
import useFormattedMessage from '@hooking/useFormattedMessage';

const ERROR_VISIBILITY_TIME = 10_000;

const ErrorMessage = () => {
    const dispatch = useAppDispatch();
    const {visible, data, url, status} = useSelector(getError);
    const formatMessage = useFormattedMessage();

    const hideError = () => dispatch(errorActions.setVisibility(false));

    useEffect(() => {
        if (visible) {
            setTimeout(hideError, ERROR_VISIBILITY_TIME);
        }
    }, [visible]);

    let error = formatMessage({
        id: 'error.generic',
        defaultMessage: 'Oops something went wrong {url} {status}',
        values: {
            url,
            status,
        },
    });
    if ('message' in data) {
        error = formatMessage({
            id: data.message,
            defaultMessage: data.message,
            values: {
                url,
                status,
            },
        });
    }

    if (!visible) {
        return null;
    }

    return (
        <Text variants={['error']}>{error}</Text>
    );
};

export default ErrorMessage;

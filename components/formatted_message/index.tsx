import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getLanguage} from '@redux/selectors/laguage';
import i18n from '@i18n/index';
import {TranslationKey} from '@typing/language';
import deepEqual from 'deep-equal';

type Props = {
    id: TranslationKey;
    defaultMessage: string;
    values?: Record<string, string | number>;
};

const FormattedMessage = ({id, defaultMessage, values}: Props) => {
    const languageKey = useSelector(getLanguage);
    const language = i18n[languageKey];
    let message = defaultMessage;
    if (language && language[id]) {
        message = language[id];
    }

    if (values) {
        Object.keys(values).forEach((key: string) => {
            message = message.replaceAll('{' + key + '}', String(values[key]));
        });
    }

    return (
        <Text>{message}</Text>
    );
};

const areEqual = (prevProps: Props, nextProps: Props) => deepEqual(prevProps.values, nextProps.values);

export default React.memo(FormattedMessage, areEqual);

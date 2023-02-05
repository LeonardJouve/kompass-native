import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getLang} from '@redux/selectors/lang';
import i18n from '@i18n';

type Props = {
    id: string;
    defaultMessage: string;
    values?: Record<string, any>;
};

const FormattedMessage = ({id, defaultMessage, values}: Props) => {
    const lang = useSelector(getLang);
    let message = i18n[lang][id];
    if (!message) {
        message = defaultMessage;
    }

    return (
        <Text>{message}</Text>
    );
};

export default React.memo(FormattedMessage);

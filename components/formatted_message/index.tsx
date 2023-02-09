import React from 'react';
import {Text} from 'react-native';
import {TranslationKey} from '@typing/language';
import deepEqual from 'deep-equal';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = {
    id: TranslationKey;
    defaultMessage: string;
    values?: Record<string, string | number>;
};

const FormattedMessage = ({id, defaultMessage, values}: Props) => {
    const formatMessage = useFormattedMessage();
    const message = formatMessage({id, defaultMessage, values});

    return (
        <Text>{message}</Text>
    );
};

const areEqual = (prevProps: Props, nextProps: Props) => deepEqual(prevProps.values, nextProps.values);

export default React.memo(FormattedMessage, areEqual);

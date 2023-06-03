import React from 'react';
import {Text} from '@renative/index';
import useFormattedMessage from '@hooking/useFormattedMessage';
import {TranslationKey} from '@typing/language';

type Props = {
    id: TranslationKey;
    defaultMessage: string;
    values?: Record<string, string | number>;
};

const FormattedMessage = ({id, defaultMessage, values}: Props) => {
    const formatMessage = useFormattedMessage();
    const message = formatMessage({id, defaultMessage, values});

    return (
        <Text variants={['primary']}>{message}</Text>
    );
};

export default React.memo(FormattedMessage);

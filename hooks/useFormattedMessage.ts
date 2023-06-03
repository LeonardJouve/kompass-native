import {useSelector} from 'react-redux';
import {getLanguage} from '@redux/selectors/laguage';
import i18n from '@i18n';
import {FormattedMessage} from '@typing/language';

const useFormattedMessage = () => {
    const languageKey = useSelector(getLanguage);
    const language = i18n[languageKey];

    return ({id, defaultMessage, values}: FormattedMessage) => {
        let message = defaultMessage;
        if (language && language[id]) {
            message = language[id];
        }

        if (values) {
            Object.keys(values).forEach((key: string) => {
                message = message.replaceAll('{' + key + '}', values[key] ? String(values[key]) : '');
            });
        }

        return message;
    };
};

export default useFormattedMessage;

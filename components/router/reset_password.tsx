import React, {useState} from 'react';
import Client from '@api/rest';
import {Button, Text, View, TextInput} from '@renative/index';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = {
    onLogin: () => void;
};

const ResetPassword = ({onLogin}: Props) => {
    const formatMessage = useFormattedMessage();
    const [email, setEmail] = useState<string>('');
    const [passwordNew, setPasswordNew] = useState<string>('');
    const [passwordNewConfirm, setPasswordNewConfirm] = useState<string>('');
    const emailPlaceholder = formatMessage({
        id: 'components.auth.email.placeholder',
        defaultMessage: 'Enter your email',
    });
    const passwordNewPlaceholder = formatMessage({
        id: 'components.auth.password_new.placeholder',
        defaultMessage: 'Enter your new password',
    });
    const passwordNewConfirmPlaceholder = formatMessage({
        id: 'components.auth.password_new_confirm.placeholder',
        defaultMessage: 'Confirm your new password',
    });
    const submitButtonText = formatMessage({
        id: 'components.auth.submit.text',
        defaultMessage: 'Submit',
    });
    const loginText = formatMessage({
        id: 'components.auth.login.text',
        defaultMessage: 'Login',
    });
    const handleSubmit = () => Client.resetPassword(email, passwordNew, passwordNewConfirm); // TODO: handle error / verify input

    return (
        <View variants={['primary', 'flex', 'column']}>
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={email}
                placeholder={emailPlaceholder}
                onChangeText={setEmail}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={passwordNew}
                placeholder={passwordNewPlaceholder}
                onChangeText={setPasswordNew}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={passwordNewConfirm}
                placeholder={passwordNewConfirmPlaceholder}
                onChangeText={setPasswordNewConfirm}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
            />
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text={submitButtonText}
                onPress={handleSubmit}
            />
            <Text
                variants={['default', 'secondary', 'center']}
                onPress={onLogin}
            >
                {loginText}
            </Text>
        </View>
    );
};

export default ResetPassword;

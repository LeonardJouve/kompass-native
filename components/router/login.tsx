import React, {useState} from 'react';
import Client from '@api/rest';
import {Button, Text, View, TextInput} from '@renative/index';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = {
    onResetPassword: () => void;
    onRegister: () => void;
    onConnect: () => void;
};

const Login = ({onResetPassword, onRegister, onConnect}: Props) => {
    const formatMessage = useFormattedMessage();
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const usernameOrEmailPlaceholder = formatMessage({
        id: 'components.auth.username_or_email.placeholder',
        defaultMessage: 'Enter your username or email',
    });
    const passwordPlaceholder = formatMessage({
        id: 'components.auth.password.placeholder',
        defaultMessage: 'Enter your password',
    });
    const submitButtonText = formatMessage({
        id: 'components.auth.submit.text',
        defaultMessage: 'Submit',
    });
    const resetPasswordText = formatMessage({
        id: 'components.auth.reset_password.text',
        defaultMessage: 'Reset Password',
    });
    const registerText = formatMessage({
        id: 'components.auth.register.text',
        defaultMessage: 'Register',
    });
    const handleSubmit = async () => {
        const {error} = await Client.login(usernameOrEmail, password);
        if (!error) {
            onConnect();
        }
    }; // TODO: handle error / verify input

    return (
        <View variants={['primary', 'flex', 'column']}>
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={usernameOrEmail}
                placeholder={usernameOrEmailPlaceholder}
                onChangeText={setUsernameOrEmail}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={password}
                placeholder={passwordPlaceholder}
                onChangeText={setPassword}
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
                onPress={onResetPassword}
            >
                {resetPasswordText}
            </Text>
            <Text
                variants={['default', 'secondary', 'center']}
                onPress={onRegister}
            >
                {registerText}
            </Text>
        </View>
    );
};

export default Login;

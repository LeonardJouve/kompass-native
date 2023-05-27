import React, {useState} from 'react';
import Client from '@api/rest';
import {Button, Text, View, TextInput} from '@renative/index';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = {
    onLogin: () => void;
    onConnect: () => void;
};

const Register = ({onLogin, onConnect}: Props) => {
    const formatMessage = useFormattedMessage();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const namePlaceholder = formatMessage({
        id: 'components.auth.username.placeholder',
        defaultMessage: 'Enter your username',
    });
    const emailPlaceholder = formatMessage({
        id: 'components.auth.email.placeholder',
        defaultMessage: 'Enter your email',
    });
    const passwordPlaceholder = formatMessage({
        id: 'components.auth.password.placeholder',
        defaultMessage: 'Enter your password',
    });
    const passwordConfirmPlaceholder = formatMessage({
        id: 'components.auth.password_confirm.placeholder',
        defaultMessage: 'Confirm your password',
    });
    const submitButtonText = formatMessage({
        id: 'components.auth.register.text',
        defaultMessage: 'Register',
    });
    const loginText = formatMessage({
        id: 'components.auth.login.text',
        defaultMessage: 'Login',
    });
    const handleSubmit = async () => {
        const {error} = await Client.register(name, email, password, passwordConfirm);
        if (!error) {
            onConnect();
        }
    }; // TODO: handle error / verify input

    return (
        <View variants={['primary', 'column']}>
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={name}
                placeholder={namePlaceholder}
                onChangeText={setName}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={email}
                placeholder={emailPlaceholder}
                onChangeText={setEmail}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                keyboardType='email-address'
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={password}
                placeholder={passwordPlaceholder}
                onChangeText={setPassword}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                secureTextEntry={true}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={passwordConfirm}
                placeholder={passwordConfirmPlaceholder}
                onChangeText={setPasswordConfirm}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                secureTextEntry={true}
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

export default Register;

import React, {useState} from 'react';
import Client from '@api/rest';
import {Button, Text, View, TextInput} from '@renative/index';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = {
    onRegister: () => void;
    onConnect: () => void;
};

const Login = ({onRegister, onConnect}: Props) => {
    const formatMessage = useFormattedMessage();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const emailPlaceholder = formatMessage({
        id: 'components.auth.email.placeholder',
        defaultMessage: 'Enter your email',
    });
    const passwordPlaceholder = formatMessage({
        id: 'components.auth.password.placeholder',
        defaultMessage: 'Enter your password',
    });
    const submitButtonText = formatMessage({
        id: 'components.auth.login.text',
        defaultMessage: 'Login',
    });
    const registerText = formatMessage({
        id: 'components.auth.register.text',
        defaultMessage: 'Register',
    });
    const handleSubmit = async () => {
        const {error} = await Client.login(email, password);
        if (!error) {
            onConnect();
        }
    }; // TODO: handle error / verify input

    return (
        <View variants={['primary', 'column']}>
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
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text={submitButtonText}
                onPress={handleSubmit}
            />
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

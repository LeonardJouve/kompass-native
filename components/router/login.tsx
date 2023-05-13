import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Client from '@api/rest';
import {Button, Text, View, TextInput} from '@renative/index';
import BackButton from '@components/back_button';
import {NavigationStack} from '@typing/navigation';
import useFormattedMessage from '@hooking/useFormattedMessage';

type Props = NativeStackScreenProps<NavigationStack, 'Login'>

const Login = ({navigation}: Props) => {
    const formatMessage = useFormattedMessage();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const emailPlaceholder = formatMessage({
        id: 'components.login.email.placeholder',
        defaultMessage: 'Enter your email',
    });
    const passwordPlaceholder = formatMessage({
        id: 'components.login.password.placeholder',
        defaultMessage: 'Enter your password',
    });
    const submitButtonText = formatMessage({
        id: 'components.login.submit.text',
        defaultMessage: 'Submit',
    });
    const handleRegister = () => navigation.navigate('Register');
    const handleResetPassword = () => navigation.navigate('ResetPassword');
    const handleSubmit = () => {
        // TODO: use real device name
        Client.login(email, password, 'test');
    };

    return (
        <View
            variants={['primary', 'flex', 'column']}
            padding={{padding: 'l'}}
        >
            <BackButton routeName='App'/>
            <Text variants={['default', 'header', 'start']}>{'Login'}</Text>
            <TextInput
                variants={['primary']}
                value={email}
                placeholder={emailPlaceholder}
                onChangeText={setEmail}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                style={{width: '100%', borderRadius: 10, borderColor: '#333333', borderWidth: 1, borderStyle: 'solid'}}
            />
            <TextInput
                variants={['primary']}
                value={password}
                placeholder={passwordPlaceholder}
                onChangeText={setPassword}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                style={{width: '100%', borderRadius: 10, borderColor: '#333333', borderWidth: 1, borderStyle: 'solid'}}
            />
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text={submitButtonText}
                onPress={handleSubmit}
                style={{width: '100%'}}
            />
            <Text
                variants={['default', 'start']}
                onPress={handleRegister}
            >
                {'Register'}
            </Text>
            <Text
                variants={['default', 'start']}
                onPress={handleResetPassword}
            >
                {'Reset Password'}
            </Text>
        </View>
    );
};

export default Login;

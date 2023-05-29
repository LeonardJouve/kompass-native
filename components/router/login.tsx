import React, {useState} from 'react';
import {useAppDispatch} from '@redux/store';
import {authActions} from '@redux/reducers/auth';
import {Button, Text, View, TextInput} from '@renative/index';
import useTheme from '@hooking/useTheme';
import useFormattedMessage from '@hooking/useFormattedMessage';
import Checkbox from '@components/checkbox';
import {ActionStatus} from '@typing/redux';

type Props = {
    onRegister: () => void;
    onConnect: () => void;
};

const Login = ({onRegister, onConnect}: Props) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const formatMessage = useFormattedMessage();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);
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
    const rememberText = formatMessage({
        id: 'components.auth.remember.text',
        defaultMessage: 'Remember',
    });
    const handleSubmit = async () => {
        const {payload} = await dispatch(authActions.login({email, password, remember}));
        if (payload && payload.status === ActionStatus.OK) {
            onConnect();
        }
    }; // TODO: verify input

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
            <Checkbox
                checked={remember}
                onChange={setRemember}
                uncheckedColor={theme.colors.viewPrimary}
                label={rememberText}
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

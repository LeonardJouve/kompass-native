import React, {useState} from 'react';
import {useAppDispatch} from '@redux/store';
import {authActions} from '@redux/auth';
import {Button, Text, View, TextInput} from '@renative/index';
import useTheme from '@hooking/useTheme';
import useFormattedMessage from '@hooking/useFormattedMessage';
import Checkbox from '@components/checkbox';
import CONSTANTS from '@constants/index';
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
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
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
    const emailErrorLabel = formatMessage({
        id: 'components.auth.error.email',
        defaultMessage: 'Invalid email',
    });
    const passwordErrorLabel = formatMessage({
        id: 'components.auth.error.password',
        defaultMessage: 'Password is too short',
    });

    const handleSubmit = async () => {
        const {payload} = await dispatch(authActions.login({email, password, remember}));
        if (payload && payload.status === ActionStatus.OK) {
            onConnect();
        }
    };

    const handleEmailChange = (newEmail: string) => {
        const isValidNewEmail = CONSTANTS.EMAIL_REGEX.test(newEmail);
        if (!isValidEmail && isValidNewEmail) {
            setIsValidEmail(true);
        }
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword: string) => {
        const isValidNewPassword = newPassword.length >= CONSTANTS.PASSWORD_MIN_LENGTH;
        if (!isValidPassword && isValidNewPassword) {
            setIsValidPassword(true);
        }
        setPassword(newPassword);
    };

    const handleEmailValidation = () => setIsValidEmail(CONSTANTS.EMAIL_REGEX.test(email));

    const handlePasswordValidation = () => setIsValidPassword(password.length >= CONSTANTS.PASSWORD_MIN_LENGTH);

    return (
        <View variants={['primary', 'column']}>
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={email}
                placeholder={emailPlaceholder}
                onChangeText={handleEmailChange}
                onBlur={handleEmailValidation}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                keyboardType='email-address'
                hasError={!isValidEmail}
                errorLabel={emailErrorLabel}
                required={true}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={password}
                placeholder={passwordPlaceholder}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordValidation}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                secureTextEntry={true}
                hasError={!isValidPassword}
                errorLabel={passwordErrorLabel}
                required={true}
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
                disabled={!email || !password || !isValidEmail || !isValidPassword}
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

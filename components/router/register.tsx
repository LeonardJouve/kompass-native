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
    onLogin: () => void;
    onConnect: () => void;
};

// TODO: fix registration
const Register = ({onLogin, onConnect}: Props) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const formatMessage = useFormattedMessage();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState<boolean>(true);
    const [remember, setRemember] = useState<boolean>(false);
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
    const passwordConfirmErrorLabel = formatMessage({
        id: 'components.auth.error.password_confirm',
        defaultMessage: 'Password and confirmation do not match',
    });

    const handleSubmit = async () => {
        const {payload} = await dispatch(authActions.register({name, email, password, passwordConfirm, remember}));
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
        setIsValidPasswordConfirm(newPassword === passwordConfirm);
        setPassword(newPassword);
    };

    const handlePasswordConfirmChange = (newPasswordConfirm: string) => {
        const isValidNewPasswordConfirm = newPasswordConfirm === password;
        if (!isValidPasswordConfirm && isValidNewPasswordConfirm) {
            setIsValidPasswordConfirm(true);
        }
        setPasswordConfirm(newPasswordConfirm);
    };

    const handleEmailValidation = () => setIsValidEmail(CONSTANTS.EMAIL_REGEX.test(email));

    const handlePasswordValidation = () => setIsValidPassword(password.length >= CONSTANTS.PASSWORD_MIN_LENGTH);

    const handlePasswordConfirmValidation = () => setIsValidPasswordConfirm(passwordConfirm === password);

    return (
        <View variants={['primary', 'column']}>
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={name}
                placeholder={namePlaceholder}
                onChangeText={setName}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                required={true}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={email}
                placeholder={emailPlaceholder}
                onChangeText={handleEmailChange}
                onBlur={handleEmailValidation}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                keyboardType='email-address'
                required={true}
                hasError={!isValidEmail}
                errorLabel={emailErrorLabel}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={password}
                placeholder={passwordPlaceholder}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordValidation}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                secureTextEntry={true}
                required={true}
                hasError={!isValidPassword}
                errorLabel={passwordErrorLabel}
            />
            <TextInput
                variants={['primary', 'fullWidth', 'rounded']}
                value={passwordConfirm}
                placeholder={passwordConfirmPlaceholder}
                onChangeText={handlePasswordConfirmChange}
                onBlur={handlePasswordConfirmValidation}
                padding={{paddingHorizontal: 'm', paddingVertical: 's'}}
                secureTextEntry={true}
                required={true}
                hasError={!isValidPasswordConfirm}
                errorLabel={passwordConfirmErrorLabel}
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
                disabled={!name || !email || !password || !passwordConfirm || !isValidEmail || !isValidPassword || !isValidPasswordConfirm}
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

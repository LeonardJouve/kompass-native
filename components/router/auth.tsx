import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from '@renative/index';
import BackButton from '@components/back_button';
import {NavigationStack} from '@typing/navigation';
import useFormattedMessage from '@hooking/useFormattedMessage';
import Login from '@components/router/login';
import ResetPassword from '@components/router/reset_password';
import Register from '@components/router/register';

type AuthView = 'login' | 'reset_password' | 'register';

const views: Record<AuthView, React.FunctionComponent<{
    onLogin: () => void;
    onResetPassword: () => void;
    onRegister: () => void;
    onConnect: () => void;
}>> = {
    'login': Login,
    'reset_password': ResetPassword,
    'register': Register,
};

type Props = NativeStackScreenProps<NavigationStack, 'Auth'>;

const Auth = ({navigation}: Props) => {
    const formatMessage = useFormattedMessage();
    const [currentView, setCurrentView] = useState<AuthView>('login');
    const header = formatMessage({
        id: `components.auth.header.${currentView}`,
        defaultMessage: currentView.replaceAll('_', ' '),
    });
    const handleLogin = () => setCurrentView('login');
    const handleResetPassword = () => setCurrentView('reset_password');
    const handleRegister = () => setCurrentView('register');
    const handleConnect = () => navigation.goBack();

    const CurrentView = views[currentView];

    return (
        <View
            variants={['primary', 'flex', 'column']}
            padding={{padding: 'l'}}
        >
            <BackButton routeName='App'/>
            <Text variants={['default', 'header', 'start']}>{header}</Text>
            <CurrentView
                onLogin={handleLogin}
                onResetPassword={handleResetPassword}
                onRegister={handleRegister}
                onConnect={handleConnect}
            />
        </View>
    );
};

export default Auth;

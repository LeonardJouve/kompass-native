import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from '@renative';
import BackButton from '@components/back_button';
import {NavigationStack} from '@typing/navigation';
import useFormattedMessage from '@hooking/useFormattedMessage';
import Login from '@components/router/login';
import Register from '@components/router/register';
import ErrorMessage from '@components/error_message';

type AuthView = 'login' | 'register';

const views: Record<AuthView, React.FunctionComponent<{
    onLogin: () => void;
    onRegister: () => void;
    onConnect: () => void;
}>> = {
    'login': Login,
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
    const handleRegister = () => setCurrentView('register');
    const handleConnect = () => navigation.navigate('App');

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
                onRegister={handleRegister}
                onConnect={handleConnect}
            />
            <ErrorMessage/>
        </View>
    );
};

export default Auth;

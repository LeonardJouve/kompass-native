import React, {useEffect} from 'react';
import {NavigationContainer, Theme, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStack} from '@typing/navigation';
import Rest from '@api/rest';
import App from '@components/router/app';
import Auth from '@components/router/auth';
import ExempleView from '@components/router/example_view';
import Backpack from '@components/router/backpack';
import Profile from '@components/router/profile';
import useTheme from '@hooking/useTheme';

const Stack = createNativeStackNavigator<NavigationStack>();


const Rooter = () => {
    const navigationRef = useNavigationContainerRef<NavigationStack>();
    const renativeTheme = useTheme();
    const theme: Theme = {
        dark: renativeTheme.type === 'dark',
        colors: {
            primary: renativeTheme.colors.viewPrimary,
            background: renativeTheme.colors.viewPrimary,
            card: renativeTheme.colors.viewPrimary,
            text: renativeTheme.colors.textDefault,
            border: renativeTheme.colors.viewSecondary,
            notification: renativeTheme.colors.buttonPrimary,
        },
    };
    useEffect(() => {
        Rest.redirectToAuth = () => navigationRef.current?.navigate('Auth');
    }, []);
    return (
        <NavigationContainer
            ref={navigationRef}
            theme={theme}
        >
            <Stack.Navigator
                initialRouteName='App'
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen
                    name='App'
                    component={App}
                />
                <Stack.Screen
                    name='Auth'
                    component={Auth}
                />
                <Stack.Screen
                    name='ExampleView'
                    component={ExempleView}
                />
                <Stack.Screen
                    name='Backpack'
                    component={Backpack}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Rooter;

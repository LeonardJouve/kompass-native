import React, {forwardRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer, NavigationContainerRef, Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getIsLoggedIn} from '@redux/selectors/auth';
import useTheme from '@hooking/useTheme';
import App from '@components/router/app';
import Auth from '@components/router/auth';
import ExempleView from '@components/router/example_view';
import Backpack from '@components/router/backpack';
import Profile from '@components/router/profile';
import {NavigationStack} from '@typing/navigation';

const Stack = createNativeStackNavigator<NavigationStack>();

const Rooter = forwardRef<NavigationContainerRef<NavigationStack>>((_props, ref) => {
    const isLoggedIn = useSelector(getIsLoggedIn);
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

    const initialRouteName = isLoggedIn ? 'App' : 'Auth';

    return (
        <NavigationContainer
            ref={ref}
            theme={theme}
        >
            <Stack.Navigator
                initialRouteName={initialRouteName}
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
});

export default Rooter;

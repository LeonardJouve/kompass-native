import React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStack} from '@typing/navigation';
import App from '@components/router/app';
import ExempleView from '@components/router/example_view';
import Backpack from '@components/router/backpack';
import useTheme from '@hooking/useTheme';

const Stack = createNativeStackNavigator<NavigationStack>();


const Rooter = () => {
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
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                initialRouteName='App'
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen
                    name='App'
                    component={App}
                />
                <Stack.Screen
                    name='ExampleView'
                    component={ExempleView}
                />
                <Stack.Screen
                    name='Backpack'
                    component={Backpack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Rooter;

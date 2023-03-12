import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStack} from '@typing/navigation';
import App from '@components/router/app';
import ExempleView from '@components/router/example_view';

const Stack = createNativeStackNavigator<NavigationStack>();

const Rooter = () => (
    <NavigationContainer>
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
        </Stack.Navigator>
    </NavigationContainer>
);

export default Rooter;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStack} from '@typing/navigation';
import App from '@components/app';
import Test from '@components/test';

const Stack = createNativeStackNavigator<NavigationStack>();

const Rooter = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='App' screenOptions={{headerShown: false}}>
            <Stack.Screen name='App' component={App}/>
            <Stack.Screen name='Test' component={Test}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export default Rooter;

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer, Theme, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppDispatch} from '@redux/store';
import {authActions} from '@redux/auth';
import {getIsLoggedIn} from '@redux/selectors/auth';
import Rest from '@api/rest';
import useTheme from '@hooking/useTheme';
import App from '@components/router/app';
import Auth from '@components/router/auth';
import ExempleView from '@components/router/example_view';
import Backpack from '@components/router/backpack';
import Profile from '@components/router/profile';
import {NavigationStack} from '@typing/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@constants/index';

const Stack = createNativeStackNavigator<NavigationStack>();

const Rooter = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn);
    const navigationRef = useNavigationContainerRef<NavigationStack>();
    const renativeTheme = useTheme();
    const [authStateLoaded, setAuthStateLoaded] = useState(false);
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

    const getAuthState = async () => {
        try {
            const authStateJSON = await AsyncStorage.getItem(CONSTANTS.STORAGE.AUTH);
            if (!authStateJSON) {
                throw new Error();
            }
            const authState = JSON.parse(authStateJSON);
            Rest.apiToken = authState.token;
            dispatch(authActions.setAuth(authState));
        } catch (e) {}
        setAuthStateLoaded(true);
    };

    const onDisconnect = () => {
        AsyncStorage.removeItem(CONSTANTS.STORAGE.AUTH);
        navigationRef.current?.navigate('Auth');
        dispatch(authActions.disconnect());
    };

    useEffect(() => {
        Rest.onDisconnect = onDisconnect;
        getAuthState();
    }, []);

    const initialRouteName = isLoggedIn ? 'App' : 'Auth';

    if (!authStateLoaded) {
        return null;
    }

    return (
        <NavigationContainer
            ref={navigationRef}
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
};

export default Rooter;

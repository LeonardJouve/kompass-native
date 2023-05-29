import React, {useEffect, useState} from 'react';
import {useNavigationContainerRef} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@redux/store';
import {authActions} from '@redux/auth';
import Rest from '@api/rest';
import CONSTANTS from '@constants/index';
import {NavigationStack} from '@typing/navigation';
import Router from '@components/router';

const AuthGuard = () => {
    const dispatch = useAppDispatch();
    const navigationRef = useNavigationContainerRef<NavigationStack>();
    const [authStateLoaded, setAuthStateLoaded] = useState<boolean>(false);

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

    if (!authStateLoaded) {
        return null;
    }

    return <Router ref={navigationRef}/>;
};

export default AuthGuard;

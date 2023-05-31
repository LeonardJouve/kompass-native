import React, {useEffect, useState} from 'react';
import {useNavigationContainerRef} from '@react-navigation/native';
import {useAppDispatch} from '@redux/store';
import {authActions} from '@redux/auth';
import Rest from '@api/rest';
import {NavigationStack} from '@typing/navigation';
import Router from '@components/router';
import {getAuthStore, removeAuthStore} from '@utils/auth';

const AuthGuard = () => {
    const dispatch = useAppDispatch();
    const navigationRef = useNavigationContainerRef<NavigationStack>();
    const [authStateLoaded, setAuthStateLoaded] = useState<boolean>(false);

    const getAuthState = async () => {
        const authStore = await getAuthStore();

        if (!authStore) {
            setAuthStateLoaded(true);
            return;
        }

        dispatch(authActions.connect(authStore));
        Rest.apiToken = authStore.token;
        setAuthStateLoaded(true);
    };

    const onDisconnect = () => {
        removeAuthStore();
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

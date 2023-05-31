import CONSTANTS from '@constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthKeys, AuthStore} from '@redux/auth';

export const setAuthStore = (authState: AuthStore) => {
    try {
        Object.entries(authState).forEach(([key, value]) => {
            AsyncStorage.setItem(`${CONSTANTS.STORAGE.AUTH}_${key}`, JSON.stringify({[key]: value}));
        });
    } catch (e) {}
};

export const getAuthStore: () => Promise<AuthStore | null> = async () => {
    try {
        const keysObject = Object.keys(AuthKeys) as (keyof typeof AuthKeys)[];
        const authStore = {} as AuthStore;
        for (let i = 0; i < keysObject.length; i++) {
            const key = keysObject[i];
            const value = await AsyncStorage.getItem(`${CONSTANTS.STORAGE.AUTH}_${key}`);
            if (!value) {
                throw new Error('Auth store item not found');
            }
            authStore[key] = JSON.parse(value)[key];
        }
        return authStore;
    } catch (e) {
        removeAuthStore();
        return null;
    }
};

export const removeAuthStore = () => {
    try {
        Object.keys(AuthKeys).forEach((key) => {
            AsyncStorage.removeItem(`${CONSTANTS.STORAGE.AUTH}_${key}`)
        });
    } catch (e) {}
};

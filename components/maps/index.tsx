import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';

const checkAndRequestPermissionsIfNeeded = async (permissions: Permission[]) => {
    return permissions.every(async (permission) => {
        let granted = await check(permission) === RESULTS.GRANTED;
        if (!granted) {
            granted = await request(permission) === RESULTS.GRANTED;
        }
        return granted;
    });
};

const Maps = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    const checkPermissions = async () => {
        const granted = await checkAndRequestPermissionsIfNeeded([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]);
        setPermissionsGranted(granted);
    };

    useEffect(() => {
        checkPermissions();
    }, []);

    if (!permissionsGranted) {
        return null;
    }

    return (
        <MapView
            showsUserLocation={true}
            style={StyleSheet.absoluteFillObject}
        />
    );
};

export default Maps;

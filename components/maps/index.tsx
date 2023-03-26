import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Maps = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    const checkPermissions = async () => {
        let fineLocationGranted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) === RESULTS.GRANTED;
        let coarseLocationGranted = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION) === RESULTS.GRANTED;
        if (!fineLocationGranted) {
            fineLocationGranted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) === RESULTS.GRANTED;
            if (!fineLocationGranted) {
                return setPermissionsGranted(false);
            }
        }
        if (!coarseLocationGranted) {
            coarseLocationGranted = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION) === RESULTS.GRANTED;
            if (!coarseLocationGranted) {
                return setPermissionsGranted(false);
            }
        }
        setPermissionsGranted(true);
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

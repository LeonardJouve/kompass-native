import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Camera, MapType, MapViewProps, PanDragEvent, UserLocationChangeEvent} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';

const mapProps: MapViewProps = {
    provider: 'google',
    userLocationUpdateInterval: 1_000,
    showsUserLocation: true,
    minZoomLevel: 17,
    showsMyLocationButton: false,
    showsIndoors: false,
    scrollEnabled: false,
    rotateEnabled: false,
};

const checkAndRequestPermissionsIfNeeded = async (permissions: Permission[]) => {
    return permissions.every(async (permission) => {
        let granted = await check(permission) === RESULTS.GRANTED;
        if (!granted) {
            granted = await request(permission) === RESULTS.GRANTED;
        }
        return granted;
    });
};

type Props = {
    mapType?: MapType;
};

const Maps = ({mapType}: Props) => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const mapsRef = useRef<MapView | null>(null);
    const location = useRef<UserLocationChangeEvent['nativeEvent']['coordinate'] | null>(null);
    const camera = useRef<Camera | null>(null);


    useEffect(() => {
        checkPermissions();
    }, []);

    const checkPermissions = async () => {
        const granted = await checkAndRequestPermissionsIfNeeded([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]);
        setPermissionsGranted(granted);
    };

    const onMapReady = async () => {
        if (mapsRef.current) {
            camera.current = await mapsRef.current.getCamera();
        }
    };

    const onUserLocationChange = (e: UserLocationChangeEvent) => {
        const {coordinate} = e.nativeEvent;
        if (coordinate && camera.current && mapsRef.current) {
            location.current = coordinate;
            const {latitude, longitude} = coordinate;
            camera.current = {...camera.current, center: {latitude, longitude}};
            mapsRef.current.animateCamera(camera.current);
        }
    };

    const onPanDrag = (e: PanDragEvent) => {};

    if (!permissionsGranted) {
        return null;
    }

    return (
        <MapView
            ref={mapsRef}
            style={StyleSheet.absoluteFillObject}
            onMapReady={onMapReady}
            onUserLocationChange={onUserLocationChange}
            onPanDrag={onPanDrag}
            mapType={mapType}
            {...mapProps}
        />
    );
};

export default Maps;

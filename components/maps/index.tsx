import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Camera, MapType, MapViewProps, PanDragEvent, UserLocationChangeEvent, PROVIDER_GOOGLE, Point} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';

const DRAG_INTERVAL = 300;

const mapProps: MapViewProps = {
    provider: PROVIDER_GOOGLE,
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
    const touchPosition = useRef<Point | null>(null);
    const lastDragTime = useRef(0);

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

    const onPanDrag = async (e: PanDragEvent) => {
        if (!mapsRef.current || !camera.current) {
            return;
        }
        const {coordinate, position} = e.nativeEvent;
        const lastTouch = touchPosition.current;
        const lastDragEnded = Date.now() - lastDragTime.current > DRAG_INTERVAL;
        if (!lastTouch || lastDragEnded) {
            touchPosition.current = position;
            lastDragTime.current = Date.now();
            return;
        }
        const deltaX = position.x - lastTouch.x;
        const deltaY = position.y - lastTouch.y;
        const {x: currentX, y: currentY} = await mapsRef.current.pointForCoordinate(camera.current.center);
        const {x: touchX, y: touchY} = await mapsRef.current.pointForCoordinate(coordinate);
        let headingDelta;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            headingDelta = deltaX * Math.sign(touchY - currentY);
        } else {
            headingDelta = deltaY * Math.sign(currentX - touchX);
        }
        camera.current = {...camera.current, heading: camera.current.heading + (headingDelta / 10)};
        mapsRef.current.setCamera(camera.current);
        touchPosition.current = position;
        lastDragTime.current = Date.now();
    };

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

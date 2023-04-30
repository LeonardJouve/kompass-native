import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import type {Camera, MapType, MapViewProps, PanDragEvent, UserLocationChangeEvent, Point, LatLng} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS, Permission} from 'react-native-permissions';
import {useAppDispatch} from '@redux/store';
import {getPois} from '@redux/actions/map';
import {getPois as getPoisSelector} from '@redux/selectors/map';
import MarkerIcons from '@components/icons/marker_icons';

const DRAG_INTERVAL = 300;
const MARKER_SIZE = 30;

const mapProps: MapViewProps = {
    provider: PROVIDER_GOOGLE,
    userLocationUpdateInterval: 2_000,
    showsUserLocation: true,
    minZoomLevel: 17,
    maxZoomLevel: 19,
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

const getPoiIcon = (kinds: string) => {
    const markerProps = {
        width: MARKER_SIZE,
        height: MARKER_SIZE,
        fill: 'black',
    };
    if (kinds.includes('foods')) {
        return <MarkerIcons.MarkerFood {...markerProps}/>;
    }
    if (kinds.includes('shops')) {
        return <MarkerIcons.MarkerShop {...markerProps}/>;
    }
    if (kinds.includes('transport')) {
        return <MarkerIcons.MarkerTransport {...markerProps}/>;
    }
    if (kinds.includes('banks')) {
        return <MarkerIcons.MarkerBank {...markerProps}/>;
    }
    if (kinds.includes('natural')) {
        return <MarkerIcons.MarkerLand {...markerProps}/>;
    }
    if (kinds.includes('accomodations')) {
        return <MarkerIcons.MarkerLodging {...markerProps}/>;
    }
    if (kinds.includes('industrial_facilities')) {
        return <MarkerIcons.MarkerIndustry {...markerProps}/>;
    }
    if (kinds.includes('religion')) {
        return <MarkerIcons.MarkerReligion {...markerProps}/>;
    }
    if (kinds.includes('sport')) {
        return <MarkerIcons.MarkerSport {...markerProps}/>;
    }
    if (kinds.includes('amusements')) {
        return <MarkerIcons.MarkerHobby {...markerProps}/>;
    }
    if (kinds.includes('monuments')) {
        return <MarkerIcons.MarkerMonument {...markerProps}/>;
    }
    if (kinds.includes('adult')) {
        return <MarkerIcons.MarkerAdult {...markerProps}/>;
    }
    return <MarkerIcons.MarkerGeneric {...markerProps}/>;
};

type Props = {
    mapType?: MapType;
};

const Maps = ({mapType}: Props) => {
    const dispatch = useAppDispatch();
    const pois = useSelector(getPoisSelector);
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [location, setLocation] = useState<LatLng | null>(null);
    const mapsRef = useRef<MapView | null>(null);
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
            const {latitude, longitude} = coordinate;
            if (location?.latitude !== latitude && location?.longitude !== longitude) {
                dispatch(getPois({latitude, longitude}));
            }
            setLocation({latitude, longitude});
            const newCamera = {center: {latitude, longitude}};
            camera.current = {...camera.current, ...newCamera};
            mapsRef.current.animateCamera(newCamera);
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
        const newCamera = {heading: camera.current.heading + (headingDelta / 10)};
        camera.current = {...camera.current, ...newCamera};
        mapsRef.current.setCamera(newCamera);
        touchPosition.current = position;
        lastDragTime.current = Date.now();
    };

    const circle = location && (
        <Circle
            center={location}
            radius={150}
        />
    );

    const renderedPois = pois.map((poi) => {
        const {xid, point, name, kinds} = poi;
        const {lat: latitude, lon: longitude} = point;
        return (
            <Marker
                key={xid}
                coordinate={{latitude, longitude}}
                title={name}
                style={styles.marker}
            >
                {getPoiIcon(kinds)}
            </Marker>
        );
    });

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
        >
            {renderedPois}
            {circle}
        </MapView>
    );
};

const styles = StyleSheet.create({
    marker: {
        width: MARKER_SIZE,
        height: MARKER_SIZE,
    },
});

export default Maps;

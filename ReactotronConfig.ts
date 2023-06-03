import Reactotron from 'reactotron-react-native';

// adb reverse tcp:8081 tcp:8081
// adb reverse tcp:9090 tcp:9090

Reactotron
    .configure({name: 'Kompass'})
    .useReactNative()
    .connect();

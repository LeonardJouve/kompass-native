if (__DEV__) {
    import('./ReactotronConfig');
}
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Root from '@components/root';

AppRegistry.registerComponent(appName, () => Root);

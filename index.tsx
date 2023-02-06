import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import store from '@redux/store';
import App from '@components/App';
import {name as appName} from './app.json';

const Index = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

AppRegistry.registerComponent(appName, () => Index);

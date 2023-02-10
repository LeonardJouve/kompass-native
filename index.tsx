import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import store from '@redux/store';
import {name as appName} from './app.json';
import Router from './router';

const Index = () => (
    <Provider store={store}>
        <Router/>
    </Provider>
);

AppRegistry.registerComponent(appName, () => Index);

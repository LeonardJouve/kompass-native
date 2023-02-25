import React from 'react';
import {Provider} from 'react-redux';

import store from '@redux/store';
import Router from '@components/router';

const Root = () => (
    <Provider store={store}>
        <Router/>
    </Provider>
);

export default Root;

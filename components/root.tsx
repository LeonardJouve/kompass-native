import React from 'react';
import {Provider} from 'react-redux';
import store from '@redux/store';
import Router from '@components/router';
import Modals from '@components/modals';

const Root = () => (
    <Provider store={store}>
        <Router/>
        <Modals/>
    </Provider>
);

export default Root;

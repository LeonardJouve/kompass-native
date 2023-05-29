import React from 'react';
import {Provider} from 'react-redux';
import store from '@redux/store';
import AuthGuard from '@components/auth_guard';
import Modals from '@components/modals';

const Root = () => (
    <Provider store={store}>
        <AuthGuard/>
        <Modals/>
    </Provider>
);

export default Root;

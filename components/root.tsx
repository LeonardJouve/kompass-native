import React from 'react';
import {Provider} from 'react-redux';
import store from '@redux/store';
import Providers from '@components/providers';
import AuthGuard from '@components/auth_guard';
import Modals from '@components/modals';

const Root = () => (
    <Provider store={store}>
        <Providers>
            <AuthGuard/>
            <Modals/>
        </Providers>
    </Provider>
);

export default Root;

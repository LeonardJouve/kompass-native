import React from 'react';
import {View} from '@renative/index';
import TestModal from '@components/modals/test_modal';
import ErrorModal from '@components/modals/error_modal';

const Modals = () => (
    <View>
        <TestModal/>
        <ErrorModal/>
    </View>
);

export default Modals;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from '@renative/index';
import BackpackClose from '@components/backpack/backpack_close';
import {NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'Backpack'>

const Backpack = ({}: Props) => {
    return (
        <View variants={['primary', 'flex', 'relative']}>
            <BackpackClose/>
        </View>
    );
};

export default Backpack;

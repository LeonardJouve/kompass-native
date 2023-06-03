import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative/index';
import {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Inventory'>;

const Inventory = ({}: Props) => {
    return (
        <View variants={['primary', 'flex']}>
            <Text variants={['default']}>{'Inventory'}</Text>
        </View>
    );
};

export default Inventory;

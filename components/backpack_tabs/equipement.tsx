import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative';
import {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Equipement'>;

const Equipement = ({}: Props) => {
    return (
        <View variants={['primary', 'flex']}>
            <Text variants={['default']}>{'Equipement'}</Text>
        </View>
    );
};

export default Equipement;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative';
import {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Craft'>;

const Craft = ({}: Props) => {
    return (
        <View variants={['primary', 'flex']}>
            <Text variants={['default']}>{'Craft'}</Text>
        </View>
    );
};

export default Craft;

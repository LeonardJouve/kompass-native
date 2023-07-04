import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative';
import {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Encyclopedia'>;

const Encyclopedia = ({}: Props) => {
    return (
        <View variants={['primary', 'flex']}>
            <Text variants={['default']}>{'Encyclopedia'}</Text>
        </View>
    );
};

export default Encyclopedia;

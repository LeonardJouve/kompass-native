import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative';
import {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Encyclopedia'>;

const Encyclopedia = ({}: Props) => {
    return (
        <View
            variants={['secondary', 'flex', 'closable']}
            padding={{paddingHorizontal: 's'}}
        >
            <Text variants={['header']}>{'Encyclopedia'}</Text>
        </View>
    );
};

export default Encyclopedia;

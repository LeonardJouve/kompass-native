import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Button} from '@renative/index';
import {NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'Test'>

const Test = ({navigation}: Props) => (
    <View variants={['centered', 'primary']}>
        <Button
            variants={['primary']}
            textVariants={['primary']}
            text='app'
            onPress={() => navigation.navigate('App')}
        />
    </View>
);

export default Test;

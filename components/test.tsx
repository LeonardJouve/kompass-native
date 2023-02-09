import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStack} from '@typing/navigation';
import React from 'react';
import {Button, View} from 'react-native';

type Props = NativeStackScreenProps<NavigationStack, 'Test'>

const Test = ({navigation}: Props) => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title='app' onPress={() => navigation.navigate('App')}/>
    </View>
);

export default Test;

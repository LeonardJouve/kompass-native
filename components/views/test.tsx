import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStack} from '@typing/navigation';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

type Props = NativeStackScreenProps<NavigationStack, 'Test'>

const Test = ({navigation}: Props) => (
    <View style={style.view}>
        <Button title='app' onPress={() => navigation.navigate('App')}/>
    </View>
);

const style = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Test;

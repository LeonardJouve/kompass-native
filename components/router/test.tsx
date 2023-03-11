import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Button} from '@renative/index';
import Websocket from '@api/websocket';
import {NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'Test'>

const eventCallback = (eventName: string, data: any) => console.log(eventName, data);

const handleWebsocketListenToAll = () => Websocket.listenToAll('test', eventCallback);

const handleWebsocketStopListeningToAll = () => Websocket.stopListeningToAll('test', eventCallback);

const Test = ({navigation}: Props) => {
    return (
        <View variants={['centered', 'primary']}>
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text='app'
                onPress={() => navigation.navigate('App')}
            />
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text='listenToAll'
                onPress={handleWebsocketListenToAll}
            />
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text='stopListeningToAll'
                onPress={handleWebsocketStopListeningToAll}
            />
        </View>
    );
};

export default Test;

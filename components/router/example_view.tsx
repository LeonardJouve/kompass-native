import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Button} from '@renative/index';
import {NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'ExampleView'>

const ExempleView = ({navigation}: Props) => {
    const changeView = () => navigation.navigate('App');

    return (
        <View variants={['centered', 'primary', 'fullHeight', 'fullWidth']}>
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text='Change view'
                onPress={changeView}
            />
        </View>
    );
};

export default ExempleView;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Button} from '@renative/index';
import {NavigationStack} from '@typing/navigation';
import MainMenu from '@components/main_menu';
import Maps from '@components/maps';

type Props = NativeStackScreenProps<NavigationStack, 'ExampleView'>

const ExempleView = ({navigation}: Props) => {
    const changeView = () => navigation.navigate('App');

    return (
        <View variants={['primary', 'fullHeight', 'fullWidth', 'relative']}>
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text='Change view'
                onPress={changeView}
            />
            <MainMenu/>
            {/* <Maps/> */}
        </View>
    );
};

export default ExempleView;

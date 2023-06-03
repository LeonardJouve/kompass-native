import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Button} from '@renative/index';
import {NavigationStack} from '@typing/navigation';
import MainMenu from '@components/main_menu/main_menu';
import ProfileTrigger from '@components/profile_trigger';
import BackpackTrigger from '@components/backpack_trigger';
import Map from '@components/map';

type Props = NativeStackScreenProps<NavigationStack, 'ExampleView'>

const ExempleView = ({navigation}: Props) => {
    const changeView = () => navigation.navigate('App');

    return (
        <View variants={['primary', 'flex']}>
            {/* <Map/> */}
            <Button
                variants={['primary', 'absolute']}
                textVariants={['primary']}
                text='Change view'
                style={{bottom: 0}}
                onPress={changeView}
            />
            <ProfileTrigger/>
            <BackpackTrigger/>
            <MainMenu/>
        </View>
    );
};

export default ExempleView;

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from '@renative/index';
import useTheme from '@hooking/useTheme';
import ProfileIcon from '@res/profile_icon.svg';
import {Navigation} from '@typing/navigation';
import {StyleSheet} from 'react-native';

const ProfileTrigger = () => {
    const navigation = useNavigation<Navigation>();
    const theme = useTheme();
    const onTouch = () => navigation.navigate('Profile');
    return (
        <View
            variants={['absolute']}
            onTouchEnd={onTouch}
            style={styles.view}
        >
            <ProfileIcon
                width={50}
                height={50}
                fill={theme.colors.viewSecondary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        top: 7,
        left: 7,
    },
});

export default ProfileTrigger;

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@renative';
import useTheme from '@hooking/useTheme';
import ProfileIcon from '@res/profile_icon.svg';
import {Navigation} from '@typing/navigation';
import {StyleSheet} from 'react-native';

const ProfileTrigger = () => {
    const navigation = useNavigation<Navigation>();
    const theme = useTheme();
    const onTouch = () => navigation.navigate('Profile');
    return (
        <Button
            variants={['absolute']}
            onTouchEnd={onTouch}
            style={styles.button}
        >
            <ProfileIcon
                width={50}
                height={50}
                fill={theme.colors.viewSecondary}
            />
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        top: 7,
        left: 7,
    },
});

export default ProfileTrigger;

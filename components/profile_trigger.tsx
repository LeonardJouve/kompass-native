import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {styled} from 'styled-components/native';
import {Button} from '@renative';
import ProfileIcon from '@res/profile_icon.svg';
import {Navigation} from '@typing/navigation';
import {StyleSheet} from 'react-native';

const ProfileTrigger = () => {
    const navigation = useNavigation<Navigation>();
    const onTouch = () => navigation.navigate('Profile');
    return (
        <Button
            variants={['absolute']}
            onTouchEnd={onTouch}
            style={styles.button}
        >
            <StyledProfileIcon/>
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        top: 7,
        left: 7,
    },
});

const StyledProfileIcon = styled(ProfileIcon)(({theme}) => ({
    width: 50,
    height: 50,
    fill: theme.colors.viewSecondary,
}));

export default ProfileTrigger;

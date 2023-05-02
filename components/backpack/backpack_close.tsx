import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@renative/index';
import useTheme from '@hooking/useTheme';
import CloseIcon from '@res/close_icon.svg';
import {Navigation} from '@typing/navigation';

const BackpackClose = () => {
    const navigation = useNavigation<Navigation>();
    const theme = useTheme();
    const onPress = () => navigation.goBack();
    return (
        <Button
            variants={['secondary', 'absolute']}
            margin={{margin:'s'}}
            style={styles.button}
            onPress={onPress}
        >
            <CloseIcon
                width={30}
                height={30}
                fill={theme.colors.viewSecondary}
            />
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        top: 0,
        right: 0,
    },
});

export default BackpackClose;

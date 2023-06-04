import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styled} from 'styled-components/native';
import {Button} from '@renative/index';
import CloseIcon from '@res/close_icon.svg';
import {Navigation, NavigationStack} from '@typing/navigation';

type Props = {
    routeName?: keyof NavigationStack;
};

const BackButton = ({routeName}: Props) => {
    const navigation = useNavigation<Navigation>();
    const onPress = () => {
        if (routeName) {
            navigation.navigate(routeName);
            return;
        }
        navigation.goBack();

    };
    return (
        <Button
            variants={['secondary', 'absolute']}
            margin={{margin:'s'}}
            style={styles.button}
            onPress={onPress}
        >
            <StyledCloseIcon/>
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        top: 0,
        right: 0,
    },
});

const StyledCloseIcon = styled(CloseIcon)(({theme}) => ({
    width: 30,
    height: 30,
    fill: theme.colors.viewSecondary,
}));

export default BackButton;

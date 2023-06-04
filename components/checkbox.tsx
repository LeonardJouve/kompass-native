import React from 'react';
import {StyleSheet} from 'react-native';
import {styled} from 'styled-components/native';
import {Button, Text, View} from '@renative/index';
import CheckIcon from '@res/check_icon.svg';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: number;
    iconColor?: string;
    checkedColor?: string;
    uncheckedColor?: string;
    label?: string;
    children?: React.ReactNode;
};

const Checkbox = ({
    checked,
    onChange,
    size = 10,
    iconColor,
    checkedColor,
    uncheckedColor,
    label,
    children,
}: Props) => {
    const handleCheck = () => onChange(!checked);

    return (
        <View
            variants={['row', 'alignCenter']}
            style={styles.container}
            onTouchEnd={handleCheck}
        >
            <StyledCheckboxButton
                padding={{padding: 'xs'}}
                styled={{
                    checked,
                    checkedColor,
                    uncheckedColor,
                }}
            >
                <StyledCheckIcon styled={{size, checked, iconColor}}/>
            </StyledCheckboxButton>
            {label && <Text variants={['default', 'label']}>{label}</Text>}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
    },
});

type StyledContainerProps = StyledComponentProps<{
    checked: boolean;
    checkedColor?: string;
    uncheckedColor?: string;
}>;

const StyledCheckboxButton = styled(Button)<StyledContainerProps>(({styled: {checked, checkedColor, uncheckedColor}, theme}) => ({
    backgroundColor: checked ?
        checkedColor ?? theme.colors.buttonPrimary :
        uncheckedColor ?? theme.colors.buttonPrimary,
    borderRadius: theme.others.rounded,
    borderColor: checked ? 'transparent' : theme.colors.border,
    borderWidth: 1,
}));

type StyledCheckIconProps = StyledComponentProps<{
    size: number;
    checked: boolean;
    iconColor?: string;
}>;

const StyledCheckIcon = styled(CheckIcon)<StyledCheckIconProps>(({styled: {size, checked, iconColor}, theme}) => ({
    width: size,
    height: size,
    fill: checked ?
        iconColor ?? theme.colors.textPrimary :
        'transparent',
}));

export default Checkbox;

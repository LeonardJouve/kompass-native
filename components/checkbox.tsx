import React from 'react';
import {type ViewStyle} from 'react-native';
import {Button, Text, View} from '@renative';
import useTheme from '@hooking/useTheme';
import CheckIcon from '@res/check_icon.svg';

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

const viewStyle: ViewStyle = {
    alignSelf: 'flex-start',
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
    const theme = useTheme();
    const handleCheck = () => onChange(!checked);
    const checkboxStyle: ViewStyle = {
        backgroundColor: checked ?
            checkedColor ?? theme.colors.buttonPrimary :
            uncheckedColor ?? theme.colors.buttonSecondary,
        borderRadius: theme.others.rounded,
        borderColor: checked ? 'transparent' : theme.colors.border,
        borderWidth: 1,
    };

    return (
        <View
            variants={['row', 'alignCenter']}
            style={viewStyle}
            onTouchEnd={handleCheck}
        >
            <Button
                padding={{padding: 'xs'}}
                style={checkboxStyle}
            >
                <CheckIcon
                    width={size}
                    height={size}
                    fill={checked ?
                        iconColor ?? theme.colors.textPrimary :
                        'transparent'
                    }
                />
            </Button>
            {label && <Text variants={['default', 'label']}>{label}</Text>}
            {children}
        </View>
    );
};

export default Checkbox;

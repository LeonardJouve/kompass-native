import React from 'react';
import type {ViewStyle} from 'react-native';
import {Button, Text, View} from '@renative/index';
import useTheme from '@hooking/useTheme';
import CheckIcon from '@res/check_icon.svg';

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: number;
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
    label,
    children,
}: Props) => {
    const theme = useTheme();
    const handleCheck = () => onChange(!checked);
    const checkboxStyle: ViewStyle = {
        backgroundColor: checked ? theme.colors.buttonPrimary : theme.colors.buttonSecondary,
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
                    fill={theme.colors.textPrimary}
                />
            </Button>
            {label && <Text variants={['default', 'label']}>{label}</Text>}
            {children}
        </View>
    );
};

export default Checkbox;

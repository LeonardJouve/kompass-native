import React from 'react';
import {type SvgProps} from 'react-native-svg';
import {View, Button} from '@renative';
import useTheme from '@hooking/useTheme';
import type {ViewVariant} from '@typing/theme';

type Option = ({icon: React.FC<SvgProps>; content?: never;} | {content: React.ReactNode; icon?: never;}) & {
    disabled?: boolean;
    isDangerous?: boolean;
    onPress?: () => void;
};

type Props = {
    name: string;
    options: Option[];
    variants?: ViewVariant[];
    size?: number;
    colorPrimary?: string;
    colorSecondary?: string;
};

const SplitButton = ({
    name,
    options,
    variants = [],
    size = 30,
    colorPrimary,
    colorSecondary,
}: Props) => {
    const theme = useTheme();
    const buttons = options.map(({icon, content, disabled, isDangerous, onPress}, index) => {
        const Icon = icon;
        return (
            <Button
                variants={['primary']}
                key={'split_button_' + name + index}
                disabled={disabled}
                onPress={onPress}
                style={{backgroundColor: colorPrimary ?? theme.colors.viewPrimary}}
            >
                {Boolean(content) && content}
                {Icon && (
                    <Icon
                        width={size}
                        height={size}
                        fill={isDangerous ? theme.colors.dangerous : colorSecondary ?? theme.colors.viewSecondary}
                    />
                )}
            </Button>
        );
    });
    if (!options.length) {
        return null;
    }
    return (
        <View
            variants={['row', 'rounded', ...variants]}
            padding={{padding: 'xs'}}
            style={{backgroundColor: colorSecondary ?? theme.colors.viewSecondary}}
        >
            {buttons}
        </View>
    );
};

export default SplitButton;

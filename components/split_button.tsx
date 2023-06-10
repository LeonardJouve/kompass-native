import React from 'react';
import {View, Button} from '@renative';
import useTheme from '@hooking/useTheme';
import {type SvgProps} from 'react-native-svg';

type Option = {
    icon: React.FC<SvgProps>;
    isDangerous?: boolean;
    onPress: () => void;
};

type Props = {
    name: string;
    options: Option[];
    size?: number;
    colorPrimary?: string;
    colorSecondary?: string;
};

const SplitButton = ({
    name,
    options,
    size = 30,
    colorPrimary,
    colorSecondary,
}: Props) => {
    const theme = useTheme();
    const buttons = options.map(({icon, isDangerous, onPress}, index) => {
        const Icon = icon;
        return (
            <Button
                variants={['primary']}
                key={`split_button_${name}_${index}`}
                onPress={onPress}
                style={{backgroundColor: colorPrimary ?? theme.colors.viewPrimary}}
            >
                <Icon
                    width={size}
                    height={size}
                    fill={isDangerous ? theme.colors.dangerous : colorSecondary ?? theme.colors.viewSecondary}
                />
            </Button>
        );
    });
    if (!options.length) {
        return null;
    }
    return (
        <View
            variants={['row', 'rounded']}
            padding={{padding: 'xs'}}
            style={{backgroundColor: colorSecondary ?? theme.colors.viewSecondary}}
        >
            {buttons}
        </View>
    );
};

export default SplitButton;

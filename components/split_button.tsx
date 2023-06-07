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
};

const SplitButton = ({
    name,
    options,
    size = 30,
}: Props) => {
    const theme = useTheme();
    const buttons = options.map(({icon, isDangerous, onPress}, index) => {
        const Icon = icon;
        return (
            <Button
                variants={['primary']}
                key={`split_button_${name}_${index}`}
                onPress={onPress}
                style={{backgroundColor: theme.colors.viewPrimary}}
            >
                <Icon
                    width={size}
                    height={size}
                    fill={isDangerous ? theme.colors.dangerous : theme.colors.viewPrimary}
                />
            </Button>
        );
    });
    return (
        <View
            variants={['secondary', 'row', 'rounded']}
            padding={{padding: 'xs'}}
        >
            {buttons}
        </View>
    );
};

export default SplitButton;

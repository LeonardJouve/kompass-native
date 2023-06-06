import React from 'react';
import {View, Button} from '@renative';
import {type SvgProps} from 'react-native-svg';

type Option = {
    icon: React.FC<SvgProps>;
};

type Props = {
    name: string;
    options: Option[];
    size?: number;
};

const SplitButton = ({
    name,
    options,
    size = 20,
}: Props) => {
    const buttons = options.map((option, index) => {
        const Icon = option.icon;
        return (
            <Button
                key={`split_button_${name}_${index}`}
            >
                <Icon
                    width={size}
                    height={size}
                />
            </Button>
        );
    });
    return (
        <View>
            {buttons}
        </View>
    );
};

export default SplitButton;

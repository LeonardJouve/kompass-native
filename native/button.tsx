import React from 'react';
import {Pressable, Text} from 'react-native';
import useTheme, {Theme} from '@hooking/useTheme';
import {StyleProp, ViewStyle} from 'react-native/types';

type Props = {
    variant: keyof Theme['variants']['button'];
    text: string;
    style?: StyleProp<ViewStyle>;
};

const Button = ({variant, text, style}: Props) => {
    const theme = useTheme();
    return (
        <Pressable style={[theme.variants.button[variant], style]}>
            <Text style={theme.variants.text[variant]}>{text}</Text>
        </Pressable>
    );
};

export default Button;

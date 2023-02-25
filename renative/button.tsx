import React from 'react';
import {Animated, Pressable, Text} from 'react-native';
import useTheme, {Theme} from '@hooking/useTheme';
import {StyleProp, ViewStyle} from 'react-native/types';

type Props = {
    variant: keyof Theme['variants']['button'];
    text: string;
    style?: StyleProp<ViewStyle>;
};

const Button = ({variant, text, style}: Props) => {
    const theme = useTheme();
    const animated = new Animated.Value(1);
    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.4,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{opacity: animated}}>
            <Pressable
                onPressIn={fadeIn}
                onPressOut={fadeOut}
                style={[theme.variants.button[variant], style]}
            >
                <Text style={theme.variants.text[variant]}>
                    {text}
                </Text>
            </Pressable>
        </Animated.View>
    );
};

export default Button;

import React from 'react';
import {Animated, Pressable} from 'react-native';
import {Text} from '@renative/index';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/theme';
import {ViewStyle, PressableProps, TextStyle, StyleProp} from 'react-native/types';
import {ButtonVariant, MarginProp, PaddingProp, TextVariant} from '@typing/theme';

type Props = {
    variants?: ButtonVariant[];
    textVariants?: TextVariant[];
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>;
    text?: string;
    onPress?: () => void;
    children?: React.ReactNode;
    margin?: MarginProp;
    textMargin?: MarginProp;
    padding?: PaddingProp;
    textPadding?: PaddingProp;
} & Omit<PressableProps, 'style' | 'onPressIn' | 'onPressOut'>;

const Button = ({variants = [], textVariants = [], style, textStyle, margin = {}, textMargin = {}, padding = {}, textPadding = {}, text, onPress, children, ...props}: Props) => {
    const theme = useTheme();
    const animated = new Animated.Value(1);
    const onPressIn = () => {
        Animated.timing(animated, {
            toValue: 0.6,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        if (onPress) {
            onPress();
        }
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const opacityStyle = {opacity: animated};
    const buttonStyle = variants.map((variant) => theme.variants.button[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacing = getSpacings(theme.spacing, padding);

    return (
        <Animated.View
            onTouchStart={onPressIn}
            onTouchEnd={onPressOut}
            style={[opacityStyle, buttonStyle, marginSpacings, paddingSpacing, style]}
        >
            <Pressable {...props}>
                {text ? (
                    <Text
                        variants={textVariants}
                        style={textStyle}
                        margin={textMargin}
                        padding={textPadding}
                    >
                        {text}
                    </Text>
                ) : (
                    children
                )}
            </Pressable>
        </Animated.View>
    );
};

export default Button;

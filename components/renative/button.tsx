import React, {forwardRef} from 'react';
import {Animated, Pressable, StyleSheet, type GestureResponderEvent, View as NativeView} from 'react-native';
import {Text} from '@renative';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/renative';
import {ViewStyle, PressableProps, TextStyle, StyleProp} from 'react-native/types';
import {ButtonVariant, MarginProp, PaddingProp, TextVariant} from '@typing/theme';

type Props = {
    variants?: ButtonVariant[];
    textVariants?: TextVariant[];
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>;
    text?: string;
    onPress?: (event: GestureResponderEvent) => void;
    children?: React.ReactNode;
    margin?: MarginProp;
    textMargin?: MarginProp;
    padding?: PaddingProp;
    disabled?: boolean;
    textPadding?: PaddingProp;
} & Omit<PressableProps, 'style' | 'onPressOut'>;

// TODO: ripple animation
const Button = forwardRef<NativeView, Props>(({
    variants = [],
    textVariants = [],
    style,
    textStyle,
    margin = {},
    textMargin = {},
    padding = {},
    textPadding = {},
    text,
    disabled,
    onPress,
    children,
    ...props
}, ref) => {
    const theme = useTheme();
    const animated = new Animated.Value(1);
    const onPressIn = (event: GestureResponderEvent) => {
        if (disabled) {
            return;
        }
        props.onPressIn?.(event);
        Animated.timing(animated, {
            toValue: 0.6,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = (event: GestureResponderEvent) => {
        if (disabled) {
            return;
        }
        onPress?.(event);
        Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const buttonStyle = variants.map((variant) => theme.variants.button[variant]);
    if (disabled) {
        buttonStyle.push(theme.variants.button.disabled);
    }
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacing = getSpacings(theme.spacing, padding);

    const {position, top, bottom, right, left} = StyleSheet.flatten([buttonStyle, style]);

    return (
        <Animated.View
            ref={ref}
            style={{opacity: animated, position, top, bottom, right, left}}
        >
            <Pressable
                style={[buttonStyle, marginSpacings, paddingSpacing, style]}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                {...props}
            >
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
});

export default Button;

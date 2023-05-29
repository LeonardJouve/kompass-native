import React from 'react';
import {Text as NativeText} from 'react-native';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/renative';
import {TextStyle, TextProps, StyleProp} from 'react-native/types';
import {MarginProp, PaddingProp, TextVariant} from '@typing/theme';

type Props = {
    variants?: TextVariant[];
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    margin?: MarginProp;
    padding?: PaddingProp;
} & Omit<TextProps, 'style'>;

const Text = ({variants = [], style, margin = {}, padding = {}, children, ...props}: Props) => {
    const theme = useTheme();
    const textStyle = variants.map((variant) => theme.variants.text[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacings = getSpacings(theme.spacing, padding);
    return (
        <NativeText
            style={[...textStyle, marginSpacings, paddingSpacings, style]}
            {...props}
        >
            {children}
        </NativeText>
    );
};

export default Text;

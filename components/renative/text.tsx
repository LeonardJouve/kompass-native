import React from 'react';
import {Text as NativeText, type TextProps} from 'react-native';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/renative';
import {MarginProp, PaddingProp, TextVariant} from '@typing/theme';

type Props = {
    variants?: TextVariant[];
    children?: React.ReactNode;
    margin?: MarginProp;
    padding?: PaddingProp;
} & TextProps;

const Text = ({variants = [], style, margin = {}, padding = {}, children, ...props}: Props) => {
    const theme = useTheme();
    const textStyle = variants.map((variant) => theme.variants.text[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacings = getSpacings(theme.spacing, padding);
    return (
        <NativeText
            style={[textStyle, marginSpacings, paddingSpacings, style]}
            {...props}
        >
            {children}
        </NativeText>
    );
};

export default Text;

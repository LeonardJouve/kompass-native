import React from 'react';
import {View as NativeView} from 'react-native';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/renative';
import {ViewStyle, ViewProps, StyleProp} from 'react-native/types';
import {ViewVariant, PaddingProp, MarginProp} from '@typing/theme';

type Props = {
    variants?: ViewVariant[];
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    margin?: MarginProp;
    padding?: PaddingProp;
} & Omit<ViewProps, 'style'>;

const View = ({variants = [], style, margin = {}, padding = {}, children, ...props}: Props) => {
    const theme = useTheme();
    const viewStyle = variants.map((variant) => theme.variants.view[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacings = getSpacings(theme.spacing, padding);
    return (
        <NativeView
            style={[...viewStyle, marginSpacings, paddingSpacings, style]}
            {...props}
        >
            {children}
        </NativeView>
    );
};

export default View;

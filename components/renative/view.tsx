import React, {forwardRef} from 'react';
import {View as NativeView, type ViewProps} from 'react-native';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/renative';
import type {ViewVariant, PaddingProp, MarginProp} from '@typing/theme';

type Props = {
    variants?: ViewVariant[];
    children?: React.ReactNode;
    margin?: MarginProp;
    padding?: PaddingProp;
} & ViewProps;

const View = forwardRef<NativeView, Props>(({variants = [], style, margin = {}, padding = {}, children, ...props}, ref) => {
    const theme = useTheme();
    const viewStyle = variants.map((variant) => theme.variants.view[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacings = getSpacings(theme.spacing, padding);
    return (
        <NativeView
            style={[viewStyle, marginSpacings, paddingSpacings, style]}
            {...props}
        >
            {children}
        </NativeView>
    );
});

export default View;

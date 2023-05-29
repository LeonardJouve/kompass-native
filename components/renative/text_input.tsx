import React from 'react';
import {TextInput as NativeTextInput, TextInputProps} from 'react-native';
import useTheme from '@hooking/useTheme';
import {getSpacings} from '@utils/renative';
import {MarginProp, PaddingProp, TextInputVariant} from '@typing/theme';

type Props = {
    variants?: TextInputVariant[];
    margin?: MarginProp;
    padding?: PaddingProp;
} & TextInputProps;

const TextInput = ({variants = [], margin = {}, padding = {}, style, children, ...props}: Props) => {
    const theme = useTheme();

    const textInputStyle = variants.map((variant) => theme.variants.textInput[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacing = getSpacings(theme.spacing, padding);
    return (
        <NativeTextInput
            style={[textInputStyle, marginSpacings, paddingSpacing, style]}
            {...props}
        >
            {children}
        </NativeTextInput>
    );
};

export default TextInput;

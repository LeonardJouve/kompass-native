import React, {useState} from 'react';
import {
    TextInput as NativeTextInput,
    StyleSheet,
    type TextStyle,
    type TextInputProps,
    type TextInputFocusEventData,
    type NativeSyntheticEvent,
    type StyleProp,
} from 'react-native';
import {styled} from 'styled-components/native';
import Text from '@renative/text';
import View from '@renative/view';
import useTheme from '@hooking/useTheme';
import useFormattedMessage from '@hooking/useFormattedMessage';
import {getSpacings} from '@utils/renative';
import DangerIcon from '@res/danger_icon.svg';
import type {MarginProp, PaddingProp, TextInputVariant, TextVariant} from '@typing/theme';
import {StyledComponentProps} from '@typing/styled';

type Props = {
    variants?: TextInputVariant[];
    margin?: MarginProp;
    padding?: PaddingProp;
    label?: string | React.ReactNode;
    labelVariants?: TextVariant[];
    errorLabel?: string | React.ReactNode;
    hasError?: boolean;
    required?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
} & TextInputProps;

const TextInput = ({
    variants = [],
    margin = {},
    padding = {},
    style,
    label,
    labelVariants = ['default'],
    errorLabel,
    hasError,
    required,
    value,
    onChangeText,
    onBlur,
    children,
    ...props
}: Props) => {
    const theme = useTheme();
    const [isRequiredValid, setIsRequiredValid] = useState<boolean>(true);
    const formatMessage = useFormattedMessage();
    const textInputStyle = variants.map((variant) => theme.variants.textInput[variant]);
    const marginSpacings = getSpacings(theme.spacing, margin);
    const paddingSpacing = getSpacings(theme.spacing, padding);

    if (hasError || !isRequiredValid) {
        textInputStyle.push(theme.variants.textInput.error);
    }

    const hasLabel =  label || (hasError && errorLabel) || !isRequiredValid;

    let inputLabel;
    if (label) {
        inputLabel = typeof label === 'string' ? <Text variants={labelVariants}>{label}</Text> : label;
    }
    if ((hasError && errorLabel) || !isRequiredValid) {
        const requiredErrorText = formatMessage({
            id: 'components.text_input.error.required',
            defaultMessage: 'This field cannot be empty',
        });
        inputLabel = (
            <>
                <StyledDangerIcon/>
                {typeof errorLabel === 'string' || !isRequiredValid ? <Text variants={[...labelVariants, 'error']}>{isRequiredValid ? errorLabel : requiredErrorText}</Text> : errorLabel}
            </>
        );
    }

    const handleChangeText = (newValue: string) => {
        onChangeText?.(newValue);
        const isNewRequiredValid = newValue !== undefined && newValue.length > 0;
        if (!isRequiredValid && isNewRequiredValid) {
            setIsRequiredValid(isNewRequiredValid);
        }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e);
        if (required) {
            setIsRequiredValid(value !== undefined && value.length > 0);
        }
    };

    return (
        <>
            <View
                variants={['relative']}
                style={styles.labelContainer}
            >
                {hasLabel && (
                    <StyledLabelView
                        variants={['absolute', 'row', 'alignCenter']}
                        padding={{paddingHorizontal: 'xs'}}
                        styled={{inputStyles: [textInputStyle, style]}}
                    >
                        {inputLabel}
                    </StyledLabelView>
                )}
            </View>
            <NativeTextInput
                style={[textInputStyle, marginSpacings, paddingSpacing, style]}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                {...props}
            >
                {children}
            </NativeTextInput>
        </>
    );
};

const styles = StyleSheet.create({
    labelContainer: {
        zIndex: 1,
    },
});

type StyledLabelProps = StyledComponentProps<{
    inputStyles: StyleProp<TextStyle>,
  }>;

const StyledLabelView = styled(View)<StyledLabelProps>(({styled: {inputStyles}, theme}) => ({
    top: 0,
    left: 15,
    gap: theme.spacing.xs,
    backgroundColor: StyleSheet.flatten(inputStyles)?.backgroundColor as string | undefined,
}));

const StyledDangerIcon = styled(DangerIcon)(({theme}) => ({
    width: 12,
    height: 12,
    fill: theme.colors.dangerous,
}));

export default TextInput;

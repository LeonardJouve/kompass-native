import {ThemeState} from '@redux/reducers/theme';
import {StyleProp as NativeStyleProp, TextStyle, ViewStyle} from 'react-native/types';

enum ThemeTypes {
    light,
    dark,
}

enum Colors {
    buttonPrimary,
    buttonSecondary,
    viewPrimary,
    viewSecondary,
    textPrimary,
    textSecondary,
}

enum Sizes {
    xl,
    l,
    m,
    s,
    xs,
}

enum Breakpoints {
    phone,
    tablet,
}

enum ButtonVariants {
    primary,
    secondary,
}

enum ViewVariants {
    primary,
    secondary,
    row,
    column,
    centered,
    rounded,
    fullWidth,
    fullHeight,
    elevationLow,
    elevationMedium,
    elevationHigh,
    flex,
}

enum TextVariants {
    primary,
    secondary,
    header,
}

enum Margins {
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
}

enum Paddings {
    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,
}

type Margin = keyof typeof Margins;

type Padding = keyof typeof Paddings;

export type MarginProp = Partial<Record<Margin, Size | number>>;

export type PaddingProp = Partial<Record<Padding, Size | number>>;

export type Spacings = Record<Size, number>;

export type ThemeType = keyof typeof ThemeTypes;

export type Themes = Record<ThemeType, ThemeState>;

export type Color = keyof typeof Colors;

export type Size = keyof typeof Sizes;

export type Breakpoint = keyof typeof Breakpoints;

export type ButtonVariant = keyof typeof ButtonVariants;

export type TextVariant = keyof typeof TextVariants;

export type ViewVariant = keyof typeof ViewVariants;

type Variants = {
    button: Record<ButtonVariant, NativeStyleProp<ViewStyle>>,
    view: Record<ViewVariant, NativeStyleProp<ViewStyle>>,
    text: Record<TextVariant, NativeStyleProp<TextStyle>>,
}

export type Theme = {
    type: ThemeState['type']
    colors: Record<Color, string>;
    spacing: Spacings;
    breakpoints: Record<Breakpoint, number>;
    variants: Variants;
};

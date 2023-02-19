import {StyleSheet} from 'react-native';
import {getTheme} from '@redux/selectors/theme';
import {useSelector} from 'react-redux';
import {StyleProp, TextStyle, ViewStyle} from 'react-native/types';
import {ThemeState} from '@redux/reducers/theme';

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
}

enum TextVariants {
    primary,
    secondary,
}

type Variants = {
    button: Record<keyof typeof ButtonVariants, StyleProp<ViewStyle>>,
    view: Record<keyof typeof ViewVariants, StyleProp<ViewStyle>>,
    text: Record<keyof typeof TextVariants, StyleProp<TextStyle>>,
}

export type Theme = {
    type: ThemeState['type']
    colors: Record<keyof typeof Colors, string>;
    spacing: Record<keyof typeof Sizes, number>;
    breakpoints: Record<keyof typeof Breakpoints, number>;
    variants: Variants;
};

const useTheme = () => {
    const {type, primaryColor, secondaryColor, backgroundPrimaryColor, backgroundSecondaryColor} = useSelector(getTheme);
    const colors: Theme['colors'] = {
        buttonPrimary: primaryColor,
        buttonSecondary: secondaryColor,
        viewPrimary: backgroundPrimaryColor,
        viewSecondary: backgroundSecondaryColor,
        textPrimary: secondaryColor,
        textSecondary: primaryColor,
    };
    return {
        type,
        colors,
        spacing: {
            xl: 20,
            l: 15,
            m: 15,
            s: 10,
            xs: 5,
        },
        breakpoints: {
            phone: 0,
            tablet: 768,
        },
        variants: {
            button: StyleSheet.create({
                primary: {
                    width: 'auto',
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.buttonPrimary,
                },
                secondary: {
                    width: 'auto',
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.buttonSecondary,
                },
            }),
            view: StyleSheet.create({
                primary: {
                    backgroundColor: colors.viewPrimary,
                },
                secondary: {
                    backgroundColor: colors.viewSecondary,
                },
            }),
            text: StyleSheet.create({
                primary: {
                    color: colors.textPrimary,
                },
                secondary: {
                    color: colors.textSecondary,
                },
            }),
        },
    } as Theme;
};

export default useTheme;

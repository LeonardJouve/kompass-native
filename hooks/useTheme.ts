import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getTheme} from '@redux/selectors/theme';
import {Theme} from '@typing/theme';
import {changeColorBrightness} from '@utils/renative';

const getColorVariants = (name: string, value: string): Theme['colors']['variants'] => {
    const variants: Record<string, string> = {};
    for (let i = -5; i <= 5; i++) {
        if (i === 0) {
            continue;
        }
        const tint = i < 0 ? 'dark' : 'light';
        variants[`${name}-${tint}-${Math.abs(i)}`] = changeColorBrightness(value, i / 5);
    }
    return variants;
};

const useTheme = (): Theme => {
    const {type, primaryColor, secondaryColor, backgroundPrimaryColor, backgroundSecondaryColor, textColor, dangerous} = useSelector(getTheme);
    const colors: Omit<Theme['colors'], 'variants'> = {
        buttonPrimary: primaryColor,
        buttonSecondary: secondaryColor,
        viewPrimary: backgroundPrimaryColor,
        viewSecondary: backgroundSecondaryColor,
        textDefault: textColor,
        textPrimary: secondaryColor,
        textSecondary: primaryColor,
        border: textColor,
        dangerous,
    };
    const colorVariants = Object.entries(colors).reduce((accumulator, [key, value]) => ({
        ...accumulator,
        ...getColorVariants(key, value),
    }), {});
    const rounded = 8;
    return {
        type,
        colors: {
            ...colors,
            variants: colorVariants,
        },
        spacing: {
            xl: 30,
            l: 20,
            m: 15,
            s: 10,
            xs: 5,
        },
        breakpoints: {
            phone: 0,
            tablet: 768,
        },
        others: {
            rounded,
        },
        variants: {
            button: StyleSheet.create({
                primary: {
                    padding: 5,
                    borderRadius: rounded,
                    backgroundColor: colors.buttonPrimary,
                    alignItems: 'center',
                },
                secondary: {
                    padding: 5,
                    borderRadius: rounded,
                    backgroundColor: colors.buttonSecondary,
                    alignItems: 'center',
                },
                disabled: {
                    opacity: 0.7,
                },
                alignCenter: {
                    alignItems: 'center',
                },
                relative: {
                    position: 'relative',
                },
                absolute: {
                    position: 'absolute',
                },
                row: {
                    flexDirection: 'row',
                    gap: 10,
                },
                column: {
                    flexDirection: 'column',
                    gap: 10,
                },
                centered: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                rounded: {
                    borderRadius: rounded,
                },
                bordered: {
                    borderColor: colors.border,
                    borderWidth: 3,
                },
            }),
            view: StyleSheet.create({
                primary: {
                    backgroundColor: colors.viewPrimary,
                },
                secondary: {
                    backgroundColor: colors.viewSecondary,
                },
                row: {
                    flexDirection: 'row',
                    gap: 10,
                },
                column: {
                    flexDirection: 'column',
                    gap: 10,
                },
                centered: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                alignCenter: {
                    alignItems: 'center',
                },
                justifyCenter: {
                    justifyContent: 'center',
                },
                fullWidth: {
                    width: '100%',
                },
                fullHeight: {
                    height: '100%',
                },
                rounded: {
                    borderRadius: rounded,
                },
                elevationLow: {
                    elevation: 2,
                },
                elevationMedium: {
                    elevation: 5,
                },
                elevationHigh: {
                    elevation: 8,
                },
                flex: {
                    flex: 1,
                },
                relative: {
                    position: 'relative',
                },
                absolute: {
                    position: 'absolute',
                },
                bordered: {
                    borderColor: colors.border,
                    borderWidth: 3,
                },
                closable: {
                    paddingTop: 60,
                },
                spaceBetween: {
                    justifyContent: 'space-between',
                },
            }),
            text: StyleSheet.create({
                default: {
                    color: colors.textDefault,
                },
                primary: {
                    color: colors.textPrimary,
                },
                secondary: {
                    color: colors.textSecondary,
                },
                error: {
                    color: colors.dangerous,
                },
                header: {
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                label: {
                    fontStyle: 'italic',
                    fontSize: 13,
                },
                relative: {
                    position: 'relative',
                },
                absolute: {
                    position: 'absolute',
                },
                start: {
                    alignSelf: 'flex-start',
                },
                center: {
                    alignSelf: 'center',
                },
                end: {
                    alignSelf: 'flex-end',
                },
                textCenter: {
                    textAlign: 'center',
                },
            }),
            textInput: StyleSheet.create({
                primary: {
                    backgroundColor: colors.viewPrimary,
                    borderColor: colors.border,
                    borderWidth: 1,
                },
                secondary: {
                    backgroundColor: colors.viewSecondary,
                    borderColor: colors.border,
                    borderWidth: 1,
                },
                error: {
                    borderColor: colors.dangerous,
                },
                fullWidth: {
                    width: '100%',
                },
                fullHeight: {
                    height: '100%',
                },
                rounded: {
                    borderRadius: rounded,
                },
            }),
        },
    };
};

export default useTheme;

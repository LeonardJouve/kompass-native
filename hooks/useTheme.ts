import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getTheme} from '@redux/selectors/theme';
import {Theme} from '@typing/theme';

const useTheme = (): Theme => {
    const {type, primaryColor, secondaryColor, backgroundPrimaryColor, backgroundSecondaryColor, textColor, dangerous} = useSelector(getTheme);
    const colors: Theme['colors'] = {
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
    const rounded = 8;
    return {
        type,
        colors,
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
                relative: {
                    position: 'relative',
                },
                absolute: {
                    position: 'absolute',
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

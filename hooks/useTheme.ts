import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getTheme} from '@redux/selectors/theme';
import {Theme} from '@typing/theme';

const useTheme = (): Theme => {
    const {type, primaryColor, secondaryColor, backgroundPrimaryColor, backgroundSecondaryColor, textColor} = useSelector(getTheme);
    const colors: Theme['colors'] = {
        buttonPrimary: primaryColor,
        buttonSecondary: secondaryColor,
        viewPrimary: backgroundPrimaryColor,
        viewSecondary: backgroundSecondaryColor,
        textDefault: textColor,
        textPrimary: secondaryColor,
        textSecondary: primaryColor,
    };
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
        variants: {
            button: StyleSheet.create({
                primary: {
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.buttonPrimary,
                    alignItems: 'center',
                },
                secondary: {
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.buttonSecondary,
                    alignItems: 'center',
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
                fullWidth: {
                    width: '100%',
                },
                fullHeight: {
                    height: '100%',
                },
                rounded: {
                    borderRadius: 8,
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
                header: {
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 20,
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
                end: {
                    alignSelf: 'flex-end',
                },
            }),
            textInput: StyleSheet.create({
                primary: {
                    backgroundColor: colors.viewPrimary,
                },
                secondary: {
                    backgroundColor: colors.viewSecondary,
                },
            }),
        },
    };
};

export default useTheme;

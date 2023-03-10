import {ThemeState} from '@redux/reducers/theme';
import {Themes as ThemesType} from '@typing/theme';

const lightTheme: ThemeState = {
    type: 'light',
    primaryColor: '#2244BB',
    secondaryColor: '#E3E3E3',
    backgroundPrimaryColor: '#FFFFFF',
    backgroundSecondaryColor: '#224477',
    textColor: '#555555',
};

const darkTheme: ThemeState = {
    type: 'dark',
    primaryColor: '#0011AA',
    secondaryColor: '#9E9E9E',
    backgroundPrimaryColor: '#223366',
    backgroundSecondaryColor: '#002244',
    textColor: '#111111',
};

export const Themes: ThemesType = {
    light: lightTheme,
    dark: darkTheme,
};

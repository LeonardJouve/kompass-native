import {ThemeState} from '@redux/theme';
import {Themes} from '@typing/theme';

const lightTheme: ThemeState = {
    type: 'light',
    primaryColor: '#2244BB',
    secondaryColor: '#E3E3E3',
    backgroundPrimaryColor: '#FFFFFF',
    backgroundSecondaryColor: '#224477',
    textColor: '#555555',
    dangerous: '#FF4646',
};

const darkTheme: ThemeState = {
    type: 'dark',
    primaryColor: '#0011AA',
    secondaryColor: '#9E9E9E',
    backgroundPrimaryColor: '#223366',
    backgroundSecondaryColor: '#002244',
    textColor: '#111111',
    dangerous: '#C80000',
};

export const themes: Themes = {
    light: lightTheme,
    dark: darkTheme,
};

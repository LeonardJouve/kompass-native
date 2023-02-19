import {ThemeState, ThemeTypes} from '@redux/reducers/theme';

const lightTheme: ThemeState = {
    type: 'light',
    primaryColor: '#2244BB',
    secondaryColor: '#E3E3E3',
    backgroundPrimaryColor: '#FFFFFF',
    backgroundSecondaryColor: '#224477',
};

const darkTheme: ThemeState = {
    type: 'dark',
    primaryColor: '#0011AA',
    secondaryColor: '#9E9E9E',
    backgroundPrimaryColor: '#223366',
    backgroundSecondaryColor: '#002244',
};

export const Themes: Record<keyof typeof ThemeTypes, ThemeState> = {
    light: lightTheme,
    dark: darkTheme,
};

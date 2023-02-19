import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Themes} from '@constants/themes';

export enum ThemeTypes {
    light,
    dark,
}

export type ThemeState = {
    type: keyof typeof ThemeTypes | 'custom';
    primaryColor: string;
    secondaryColor: string;
    backgroundPrimaryColor: string;
    backgroundSecondaryColor: string;
};

const initialThemeState = {...Themes.light};

const setTheme = (state: ThemeState, action: PayloadAction<keyof typeof ThemeTypes>) => Themes[action.payload];

const setCustomTheme = (state: ThemeState, action: PayloadAction<ThemeState>) => action.payload;

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        setTheme,
        setCustomTheme,
    },
});

const {reducer, actions: themeActions} = themeSlice;

export {themeActions};

export default reducer;

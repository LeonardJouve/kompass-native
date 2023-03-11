import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Themes} from '@constants/themes';
import {ThemeType} from '@typing/theme';

export type ThemeState = {
    type: ThemeType | 'custom';
    primaryColor: string;
    secondaryColor: string;
    backgroundPrimaryColor: string;
    backgroundSecondaryColor: string;
};

const initialThemeState = {...Themes.light};

const setTheme = (state: ThemeState, action: PayloadAction<ThemeType>) => Themes[action.payload];

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

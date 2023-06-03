import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {themes} from '@constants/themes';
import {ThemeType} from '@typing/theme';

export type ThemeState = {
    type: ThemeType | 'custom';
    primaryColor: string;
    secondaryColor: string;
    backgroundPrimaryColor: string;
    backgroundSecondaryColor: string;
    textColor: string;
    dangerous: string;
};

const initialThemeState = {...themes.light};

const setTheme = (_state: ThemeState, action: PayloadAction<ThemeType>) => themes[action.payload];

const setCustomTheme = (_state: ThemeState, action: PayloadAction<ThemeState>) => action.payload;

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

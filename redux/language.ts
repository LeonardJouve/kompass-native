import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LanguageKey} from '@typing/language';

export type LanguageState = LanguageKey;

const initialLanguageState = 'en' as LanguageKey;

const setLanguage = (_state: LanguageState, action: PayloadAction<LanguageKey>) => action.payload;

const languageSlice = createSlice({
    name: 'language',
    initialState: initialLanguageState,
    reducers: {
        setLanguage,
    },
});

const {reducer, actions: languageActions} = languageSlice;

export {languageActions};

export default reducer;

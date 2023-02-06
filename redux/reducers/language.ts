import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LanguageKey} from '@typing/language';

export type LanguageState = LanguageKey;

export const initialLanguageState = 'en' as LanguageKey;

const setLanguage = (state: LanguageState, action: PayloadAction<LanguageKey>) => {
    return action.payload;
};

const languageSlice = createSlice({
    name: 'language',
    initialState: initialLanguageState,
    reducers: {
        setLanguage,
    },
});

const {reducer, actions: actionsLanguage} = languageSlice;

export {actionsLanguage};

export default reducer;

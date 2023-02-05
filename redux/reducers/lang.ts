import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type LangState = string;

export const initialLangState = 'en';

const setLang = (state: LangState, action: PayloadAction<string>) => {
    return action.payload;
};

const langSlice = createSlice({
    name: 'lang',
    initialState: initialLangState,
    reducers: {
        setLang,
    },
});

const {reducer, actions: actionsLang} = langSlice;

export {actionsLang};

export default reducer;

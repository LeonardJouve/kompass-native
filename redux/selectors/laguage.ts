import {GlobalState} from '@typing/global_state';
import {LanguageKey} from '@typing/language';

export const getLanguage = (state: GlobalState): LanguageKey => state.language;

import {BaseState} from '@redux/reducers/base';
import {LanguageState} from '@redux/reducers/language';

export type GlobalState = {
    base: BaseState;
    language: LanguageState;
};

import {BaseState} from '@redux/reducers/base';
import {LanguageState} from '@redux/reducers/language';
import {ModalState} from '@redux/reducers/modal';
import {ThemeState} from '@redux/reducers/theme';

export type GlobalState = {
    base: BaseState;
    language: LanguageState;
    modal: ModalState,
    theme: ThemeState,
};

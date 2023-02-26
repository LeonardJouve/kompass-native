import {TestState} from '@redux/reducers/test';
import {LanguageState} from '@redux/reducers/language';
import {ModalState} from '@redux/reducers/modal';
import {ThemeState} from '@redux/reducers/theme';

export type GlobalState = {
    test: TestState;
    language: LanguageState;
    modal: ModalState,
    theme: ThemeState,
};

import {TestState} from '@redux/reducers/test';
import {LanguageState} from '@redux/reducers/language';
import {ModalState} from '@redux/reducers/modal';
import {ThemeState} from '@redux/reducers/theme';
import {ConfigState} from '@redux/reducers/config';

export type GlobalState = {
    test: TestState;
    language: LanguageState;
    modal: ModalState,
    theme: ThemeState,
    config: ConfigState,
};

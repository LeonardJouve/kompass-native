import {BaseState} from '@redux/reducers/base';
import {LanguageState} from '@redux/reducers/language';
import {ModalState} from '@redux/reducers/modal';

export type GlobalState = {
    base: BaseState;
    language: LanguageState;
    modal: ModalState,
};

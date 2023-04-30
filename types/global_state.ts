import {LanguageState} from '@redux/reducers/language';
import {ModalState} from '@redux/reducers/modal';
import {ThemeState} from '@redux/reducers/theme';
import {ConfigState} from '@redux/reducers/config';
import {MapState} from '@redux/reducers/map';

export type GlobalState = {
    language: LanguageState;
    modal: ModalState,
    theme: ThemeState,
    config: ConfigState,
    map: MapState,
};

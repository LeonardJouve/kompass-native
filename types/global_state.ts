import {type LanguageState} from '@redux/language';
import {type ModalState} from '@redux/modal';
import {type ThemeState} from '@redux/theme';
import {type ConfigState} from '@redux/config';
import {type MapState} from '@redux/map';
import {type ErrorState} from '@redux/error';
import {type AuthState} from '@redux/auth';
import {type InventoryState} from '@redux/inventory';
import {type CraftState} from '@redux/craft';

export type GlobalState = {
    language: LanguageState;
    modal: ModalState,
    theme: ThemeState,
    config: ConfigState,
    map: MapState,
    error: ErrorState,
    auth: AuthState,
    inventory: InventoryState,
    craft: CraftState,
};

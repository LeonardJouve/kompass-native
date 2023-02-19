import {GlobalState} from '@typing/global_state';

export const getThemeType = (state: GlobalState) => state.theme.type;

export const getTheme = (state: GlobalState) => state.theme;

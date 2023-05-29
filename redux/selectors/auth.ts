import {GlobalState} from '@typing/global_state';

export const getIsLoggedIn = (state: GlobalState) => state.auth.isLoggedIn;

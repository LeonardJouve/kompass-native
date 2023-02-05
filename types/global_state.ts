import {BaseState} from '@redux/reducers/base';
import {LangState} from '@redux/reducers/lang';

export type GlobalState = {
    base: BaseState;
    lang: LangState;
};

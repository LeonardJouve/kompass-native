import {Theme} from '@typing/theme';

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}

export type StyledComponentProps<T> = {styled: T};

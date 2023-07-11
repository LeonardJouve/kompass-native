import {Craft} from '@typing/craft';

export enum ModalIdentifiers {
    NONE,
    CRAFT_MODAL,
}

export type ModalProps = NoneModalProps | CraftModalProps;

export type NoneModalProps = {
    modalId: ModalIdentifiers.NONE;
    props: {};
};

export type CraftModalProps = {
    modalId: ModalIdentifiers.CRAFT_MODAL;
    props: {
        craft: Craft;
    };
};

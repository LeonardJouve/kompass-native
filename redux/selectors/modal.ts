import type {GlobalState} from '@typing/global_state';
import {ModalIdentifiers} from '@typing/modals';

export const isModalOpen = (state: GlobalState, modalId: ModalIdentifiers): boolean => state.modal.visible && state.modal.modalId === modalId;

export const getModalId = (state: GlobalState): ModalIdentifiers => state.modal.modalId;

export const getModalProps = (state: GlobalState) => state.modal.props;

import {GlobalState} from '@typing/global_state';

export const isModalOpen = (state: GlobalState, modalId: string): boolean => state.modal.visible && state.modal.modalId === modalId;

export const getModalId = (state: GlobalState): string => state.modal.modalId;

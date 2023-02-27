import {GlobalState} from '@typing/global_state';

export const isModalOpen = (state: GlobalState, modalId: string): boolean => state.modal.visible && state.modal.modalId === modalId;

export const getModalId = (state: GlobalState): string => state.modal.modalId;

export const getModalProps = (state: GlobalState): Record<string, any> => state.modal.props;

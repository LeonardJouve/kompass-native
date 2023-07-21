import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ModalIdentifiers, ModalProps} from '@typing/modals';

export type ModalState = ModalProps & {
    visible: boolean;
};

const initialModalState = {
    modalId: ModalIdentifiers.NONE,
    props: {},
    visible: false,
} as ModalState;

const openModal = (_state: ModalState, action: PayloadAction<ModalProps>) => ({
    ...action.payload,
    visible: true,
});

const closeModal = (state: ModalState, action: PayloadAction<ModalIdentifiers>) => {
    if (state.modalId === action.payload) {
        return {
            ...state,
            visible: false,
        };
    }
    return state;
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        openModal,
        closeModal,
    },
});

const {reducer, actions: modalActions} = modalSlice;

export {modalActions};

export default reducer;

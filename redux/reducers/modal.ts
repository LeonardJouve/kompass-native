import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ModalState = {
    modalId: string;
    visible: boolean;
};

const initialModalState = {
    modalId: '',
    visible: false,
} as ModalState;

const openModal = (state: ModalState, action: PayloadAction<string>) => ({
    modalId: action.payload,
    visible: true,
});

const closeModal = (state: ModalState, action: PayloadAction<string>) => {
    if (state.modalId === action.payload) {
        return {
            modalId: action.payload,
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

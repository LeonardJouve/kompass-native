import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ModalIdentifier} from '@typing/modals';

export type ModalState = {
    modalId: string;
    props: Record<string, any>;
    visible: boolean;
};

const initialModalState = {
    modalId: '',
    props: {},
    visible: false,
};

const openModal = (_state: ModalState, action: PayloadAction<{modalId: ModalIdentifier; props?: Record<string, any>}>) => ({
    modalId: action.payload.modalId,
    props: action.payload.props ?? {},
    visible: true,
});

const closeModal = (state: ModalState, action: PayloadAction<ModalIdentifier>) => {
    if (state.modalId === action.payload) {
        return {
            modalId: action.payload,
            props: {},
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

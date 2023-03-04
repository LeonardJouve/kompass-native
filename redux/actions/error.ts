import {createAsyncThunk} from '@reduxjs/toolkit';
import Client from '@api/rest';
import {modalActions} from '@redux/reducers/modal';
import {ModalIdentifiers} from '@typing/modals';
import {Error} from '@typing/rest';

export const sendError = createAsyncThunk(
    'sendError',
    async (params: Omit<Error, 'error'>, {dispatch}) => {
        const result = await Client.sendError(params);
        dispatch(modalActions.openModal({
            modalId: ModalIdentifiers.ERROR,
            props: {...params},
        }));
        return result;
    }
);

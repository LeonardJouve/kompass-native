import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {modalActions} from '@redux/reducers/modal';
import {getModalId, isModalOpen} from '@redux/selectors/modal';
import {GlobalState} from '@typing/global_state';

const GenericModal = () => {
    const dispatch = useDispatch();
    const modalId = useSelector(getModalId);
    const visible = useSelector((state: GlobalState) => isModalOpen(state, modalId));

    const closeModal = () => dispatch(modalActions.closeModal(modalId));

    return (
        <View style={style.view}>
            <Modal
                animationType='slide'
                visible={visible}
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={[style.view]}>
                    <View style={[style.modal]}>
                        <View style={style.header}>
                            <Text>Header</Text>
                            <Button title='close' onPress={closeModal}/>
                        </View>
                        <View style={style.content}>
                            <Text style={style.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </View>
                        <View style={style.footer}>
                            <Button title='Close' onPress={closeModal}/>
                            <Button title='Confirm'/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const style = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    modal: {
        width: '90%',
        maxHeight: '90%',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        elevation: 5,
        gap: 10,
    },
    text: {
        textAlign: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        width: '100%',
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default GenericModal;

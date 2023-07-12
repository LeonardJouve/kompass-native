import React from 'react';
import {Image, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Button, Text} from '@renative';
import Rest from '@api/rest';
import {useAppDispatch} from '@redux/store';
import {modalActions} from '@redux/modal';
import {ModalIdentifiers} from '@typing/modals';
import type {Craft} from '@typing/craft';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    craft: Craft;
    size: number;
};

const CraftListItem = ({craft, size}: Props) => {
    const dispatch = useAppDispatch();
    const {type} = craft;

    const handlePress = () => {
        dispatch(modalActions.openModal({
            modalId: ModalIdentifiers.CRAFT_MODAL,
            props: {
                craft,
            },
        }));
    };

    return (
        <StyledContainerButton
            variants={['centered', 'rounded', 'bordered']}
            styled={{size}}
            onPress={handlePress}
        >
            <Text>
                {type}
            </Text>
            <Image
                source={{
                    uri: Rest.getItemPreviewImageRoute(type),
                    headers: {Authorization: `Bearer ${Rest.apiToken}`},
                }}
                resizeMethod='resize'
                style={styles.image}
            />
        </StyledContainerButton>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        aspectRatio: 1,
    },
});

type StyledContainerProps = StyledComponentProps<{
    size: number;
}>;

const StyledContainerButton = styled(Button)<StyledContainerProps>(({styled: {size}, theme}) => ({
    width: size,
    height: size,
    backgroundColor: theme.colors.viewPrimary,
}));

export default CraftListItem;

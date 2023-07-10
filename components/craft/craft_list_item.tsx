import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {Text, View} from '@renative';
import Rest from '@api/rest';
import type {Craft} from '@typing/craft';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    craft: Craft;
    size: number;
};

const CraftListItem = ({craft, size}: Props) => {
    const {name, id} = craft;
    return (
        <StyledContainerView
            variants={['primary', 'centered', 'rounded', 'bordered']}
            styled={{size}}
        >
            <Text>
                {name}
            </Text>
            <Image
                source={{
                    uri: Rest.getCraftImageRoute(id),
                    headers: {Authorization: `Bearer ${Rest.apiToken}`},
                    width: 50,
                    height: 50,
                }}
            />
        </StyledContainerView>
    );
};

type StyledContainerProps = StyledComponentProps<{
    size: number;
}>;

const StyledContainerView = styled(View)<StyledContainerProps>(({styled: {size}}) => ({
    width: size,
    height: size,
}));

export default CraftListItem;

import React from 'react';
import styled from 'styled-components/native';
import {Text, View} from '@renative';
import type {Craft} from '@typing/craft';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    craft: Craft;
    size: number;
};

const CraftListItem = ({craft, size}: Props) => {
    return (
        <StyledContainerView
            variants={['centered', 'rounded', 'bordered', 'primary']}
            styled={{size}}
        >
            <Text>
                {craft.name}
            </Text>
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

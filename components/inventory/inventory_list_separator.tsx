import React from 'react';
import styled from 'styled-components/native';
import {View} from '@renative';

const InventoryListSeparator = () => (
    <StyledBackdropView>
        <StyledSeparatorView variants={['primary', 'fullWidth']}/>
    </StyledBackdropView>
);

const StyledBackdropView = styled(View)(({theme}) => ({
    backgroundColor: theme.colors.variants['viewPrimary-dark-1'],
}));

const StyledSeparatorView = styled(View)(({theme}) => ({
    marginTop: -2,
    height: theme.spacing.l,
    borderTopStartRadius: theme.spacing.l,
    borderTopEndRadius: theme.spacing.l,
}));

export default InventoryListSeparator;

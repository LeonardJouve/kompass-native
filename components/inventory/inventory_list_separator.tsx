import React from 'react';
import styled from 'styled-components/native';
import {View} from '@renative';
import {changeColorBrightness} from '@utils/renative';

const InventoryListSeparator = () => (
    <StyledBackdropView>
        <StyledSeparatorView variants={['primary', 'fullWidth']}/>
    </StyledBackdropView>
);

const StyledBackdropView = styled(View)(({theme}) => ({
    backgroundColor: changeColorBrightness(theme.colors.viewPrimary, -0.07),
}));

const StyledSeparatorView = styled(View)(({theme}) => ({
    marginTop: -2,
    height: theme.spacing.l,
    borderTopStartRadius: theme.spacing.l,
    borderTopEndRadius: theme.spacing.l,
}));

export default InventoryListSeparator;

import React from 'react';
import styled from 'styled-components/native';
import {View} from '@renative';
import {changeColorBrightness} from '@utils/renative';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    placement: 'top' | 'bottom';
};

const InventoryListSeparator = ({placement}: Props) => (
    <StyledBackdropView styled={{placement}}>
        <StyledSeparatorView
            variants={['primary', 'fullWidth']}
            styled={{placement}}
        />
    </StyledBackdropView>
);


type StyledSeparatorProps = StyledComponentProps<{
    placement: Props['placement'];
}>;

const StyledBackdropView = styled(View)<StyledSeparatorProps>(({styled: {placement}, theme}) => ({
    backgroundColor: placement === 'top' ? changeColorBrightness(theme.colors.viewPrimary, -0.07) : undefined,
}));

const StyledSeparatorView = styled(View)<StyledSeparatorProps>(({styled: {placement}, theme}) => ({
    marginTop: -2,
    height: theme.spacing.l,
    borderTopStartRadius: placement === 'top' ? theme.spacing.l : 0,
    borderTopEndRadius: placement === 'top' ? theme.spacing.l : 0,
    borderBottomStartRadius: placement === 'bottom' ? theme.spacing.l : 0,
    borderBottomEndRadius: placement === 'bottom' ? theme.spacing.l : 0,
}));

export default InventoryListSeparator;

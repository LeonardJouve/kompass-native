import React from 'react';
import {styled} from 'styled-components/native';
import {Text, View} from '@renative';
import {InventoryItem} from '@typing/inventory';

type Props = {
    item: InventoryItem;
};

const InventoryListItem = ({item}: Props) => {
    return (
        <StyledItemView
            variants={['primary', 'row']}
            padding={{paddingHorizontal: 'l', paddingVertical: 's'}}
        >
            <Text variants={['default']}>{item.name}</Text>
        </StyledItemView>
    );
};

const StyledItemView = styled(View)(({theme}) => ({
    borderRadius: theme.spacing.l,
}));

export default InventoryListItem;

import React from 'react';
import {Text} from '@renative';
import {InventoryItem} from '@typing/inventory';

type Props = {
    item: InventoryItem;
};

const InventoryListItem = ({item}: Props) => {
    return (
        <Text>{item.name}</Text>
    );
};

export default InventoryListItem;

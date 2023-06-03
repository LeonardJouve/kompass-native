import React from 'react';
import {Text} from '@renative';
import {InventoryCategory, InventoryItem} from '@typing/inventory';

type Props = {
    section: {
        title: InventoryCategory;
        data: InventoryItem[];
    };
};

const InventoryListHeader = ({section}: Props) => {
    return (
        <Text variants={['header']}>{section.title}</Text>
    );
};

export default InventoryListHeader;

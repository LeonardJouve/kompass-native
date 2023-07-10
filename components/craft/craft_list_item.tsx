import React from 'react';
import {Text} from '@renative';
import type {Craft} from '@typing/craft';

type Props = {
    craft: Craft;
    size: number;
};

const CraftListItem = ({craft, size}: Props) => {
    return (
        <Text
            style={{
                width: size,
                height: size,
                backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            }}
        >
            {craft.name}
        </Text>
    );
};

export default CraftListItem;

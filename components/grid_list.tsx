import React, {useMemo, useRef, useState} from 'react';
import {FlatList, type ListRenderItemInfo, type FlatListProps, type View as NativeView} from 'react-native'; // eslint-disable-line no-restricted-imports
import {View} from '@renative';

type Props<Item> = {
    size: number;
    minGap: number;
    items: Item[];
    renderItem: (item: Item, index: number) => JSX.Element;
} & Omit<FlatListProps<Item[]>, 'renderItem' | 'data'>;

const GridList = <Item,>({items, size, minGap, renderItem, ...props}: Props<Item>) => {
    const containerRef = useRef<NativeView>(null);
    const [width, setWidth] = useState<number>(0);
    const itemsPerRow = Math.floor((width + minGap) / (size + minGap));
    const gap = (width - (itemsPerRow * size)) / (itemsPerRow - 1);
    const rows = useMemo(() => {
        const itemRow = [];
        if (!itemsPerRow) {
            return [];
        }
        for (let i = 0; i < items.length; i += itemsPerRow) {
            const row = items.slice(i, i + itemsPerRow);
            itemRow.push(row);
        }
        return itemRow;
    }, [items, itemsPerRow]);

    const handleLayout = () => containerRef.current?.measure((_x, _y, containerWidth) => setWidth(containerWidth));

    const renderRow = ({item: row}: ListRenderItemInfo<Item[]>) => {
        const renderedItems = row.map(renderItem);
        return (
            <View
                variants={['row']}
                margin={{marginBottom: gap}}
                style={{gap}}
            >
                {renderedItems}
            </View>
        );
    };

    return (
        <View
            ref={containerRef}
            variants={['fullWidth']}
            onLayout={handleLayout}
        >
            <FlatList
                data={rows}
                renderItem={renderRow}
                {...props}
            />
        </View>
    );
};

export default GridList;

import React, {useMemo, useRef, useState} from 'react';
import {FlatList, type ListRenderItemInfo, type FlatListProps, type View as NativeView} from 'react-native'; // eslint-disable-line no-restricted-imports
import {View} from '@renative';

type Props<Item> = {
    items: Item[];
    size: number;
    gap?: number;
    setSize: (size: number) => void;
    renderItem: (item: Item, index: number) => JSX.Element;
} & Omit<FlatListProps<Item[]>, 'renderItem' | 'data'>;

const GridList = <Item,>({
    items,
    size,
    gap = 15,
    setSize,
    renderItem,
    ...props
}: Props<Item>) => {
    const containerRef = useRef<NativeView>(null);
    const [width, setWidth] = useState<number>(0);
    const itemsPerRow = Math.floor((width + gap) / (size + gap));
    const newSize = Math.floor((width - ((itemsPerRow - 1) * gap)) / itemsPerRow);
    if (itemsPerRow !== 0 && size !== newSize) {
        setSize(newSize);
    }
    const rows = useMemo(() => {
        const itemRows = [];
        if (!itemsPerRow) {
            return [];
        }
        for (let i = 0; i < items.length; i += itemsPerRow) {
            const row = items.slice(i, i + itemsPerRow);
            itemRows.push(row);
        }
        return itemRows;
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

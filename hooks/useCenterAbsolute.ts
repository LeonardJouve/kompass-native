import {useState} from 'react';
import {type LayoutChangeEvent} from 'react-native';

type Dimensions = {
    width: number;
    height: number;
}

export const useCenterAbsolute = () => {
    const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});
    const onLayout = (event: LayoutChangeEvent) => setDimensions(event.nativeEvent.layout);
    const translateX = -Math.round(dimensions.width / 2);
    const translateY = -Math.round(dimensions.height / 2);
    return {translateX, translateY, onLayout};
};

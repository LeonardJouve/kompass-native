import React, {PropsWithChildren} from 'react';
import {useState} from 'react';
import {LayoutChangeEvent, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

type Props = PropsWithChildren<{
    tip: string;
}>;

const Tooltip = ({children, tip}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const handleVisibility = () => {setIsVisible(!isVisible); console.log('set visibility');};

    const onLayout = (event: LayoutChangeEvent) => {
        console.log('on layout');
        const {width: tooltipWidth, height: tooltipHeight} = event.nativeEvent.layout;
        setWidth(tooltipWidth);
        setHeight(tooltipHeight);
    };

    let tooltip: JSX.Element | undefined;
    if (isVisible) {
        tooltip = (
            <>
                <View onLayout={onLayout} style={[style.tooltipView, {left: width / 2, transform: [{translateX: -(width / 2)}, {translateY: -height}]}]}>
                    <Text style={style.tooltip}>{tip}</Text>
                </View>
            </>
        );
    }
    return (
        <View onTouchStart={handleVisibility} onTouchEnd={handleVisibility}>
            {tooltip}
            {children}
        </View>
    );
};

const style = StyleSheet.create({
    tooltipView: {
        backgroundColor: '#333333',
        position: 'absolute',
        top: -10,
        borderRadius: 5,
    },
    tooltip: {
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 5,
    },
});

export default Tooltip;

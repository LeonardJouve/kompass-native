import React, {PropsWithChildren} from 'react';
import {useState} from 'react';
import {LayoutChangeEvent, Pressable, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

type Props = PropsWithChildren<{
    tip: string;
}>;

const Tooltip = ({children, tip}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const handleLongPress = () => setIsVisible(true);
    const handlePressOut = () => setIsVisible(false);
    const onLayout = (event: LayoutChangeEvent) => {
        const {width: tooltipWidth, height: tooltipHeight} = event.nativeEvent.layout;
        setWidth(tooltipWidth);
        setHeight(tooltipHeight);
    };

    let tooltip: JSX.Element | undefined;
    if (isVisible) {
        tooltip = (
            <View
                onLayout={onLayout}
                style={[style.tooltipWrapper, {transform: [{translateY: -height}, {translateX: -(width / 2)}]}]}
            >
                <View style={style.tooltipView}>
                    <Text style={style.tooltip}>{tip}</Text>
                </View>
                <View style={style.arrow}/>
            </View>
        );
    }
    return (
        <View style={style.wrapper}>
            {tooltip}
            <Pressable
                onLongPress={handleLongPress}
                onPressOut={handlePressOut}
            >
                {children}
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        position: 'relative',
    },
    tooltipWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: -3,
        left: '50%',
    },
    tooltipView: {
        backgroundColor: '#333333',
        borderRadius: 5,
        padding: 5,
    },
    tooltip: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
    },
    arrow: {
        position: 'absolute',
        left: '50%',
        top: '100%',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderTopWidth: 10,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#333333',
        marginLeft: -9,
        marginTop: -4,
    },
});

export default Tooltip;

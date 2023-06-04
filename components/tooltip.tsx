import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {View, Text} from '@renative/index';
import {LayoutChangeEvent} from 'react-native/types';

type Props = {
    tip: string;
    children: React.ReactNode;
};

const Tooltip = ({children, tip}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const handleLongPress = () => setIsVisible(true);
    const handlePressOut = () => setIsVisible(false);
    const onLayout = (event: LayoutChangeEvent) => {
        const {width: tooltipWidth, height: tooltipHeight} = event.nativeEvent.layout;
        setWidth(Math.floor(tooltipWidth));
        setHeight(Math.floor(tooltipHeight));
    };

    let tooltip: JSX.Element | undefined;
    if (isVisible) {
        tooltip = (
            <View
                onLayout={onLayout}
                style={[styles.tooltipWrapper, {transform: [{translateY: -height}, {translateX: -(width / 2)}]}]}
            >
                <View
                    variants={['rounded']}
                    style={styles.tooltipView}
                >
                    <Text style={styles.tooltip}>{tip}</Text>
                </View>
                <View style={styles.arrow}/>
            </View>
        );
    }
    return (
        <View>
            <View
                variants={['centered']}
                style={styles.wrapper}
            >
                {tooltip}
                <Pressable
                    onLongPress={handleLongPress}
                    onPressOut={handlePressOut}
                >
                    {children}
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
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

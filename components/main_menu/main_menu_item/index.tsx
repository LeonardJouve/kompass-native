import React, {FunctionComponent, useEffect} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

export type Props = {
    index: number;
    onTouch: () => void;
    active: boolean;
    open: boolean;
    Icon: FunctionComponent<SvgProps>;
    padding?: number;
    size?: number;
};

const MainMenuItem = ({
    index,
    onTouch,
    active,
    open,
    Icon,
    padding = 7,
    size = 35,
}: Props) => {
    const animatedTop = new Animated.Value(open ? padding : padding + ((size + padding) * index));
    const animatedRotate = new Animated.Value(open ? 180 : 0);

    useEffect(() => {
        if (index === 0) {
            Animated.timing(animatedRotate, {
                toValue: open ? 0 : 180,
                duration: 200,
                useNativeDriver: false,
            }).start();
            return;
        }
        Animated.timing(animatedTop, {
            toValue: open ? padding + ((size + padding) * index) : padding,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [open]);

    const rotate = animatedRotate.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const style: Animated.WithAnimatedObject<ViewStyle> = {
        position: 'absolute',
        top: animatedTop,
        right: padding,
        transform: [{rotate}],
    };

    return (
        <Animated.View
            style={style}
            onTouchEnd={onTouch}
        >
            <Icon
                width={size}
                height={size}
                fill={active ? 'red' : 'black'}
            />
        </Animated.View>
    );
};

export default MainMenuItem;

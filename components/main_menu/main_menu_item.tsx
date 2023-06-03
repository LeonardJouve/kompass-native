import React, {FunctionComponent, useEffect} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import useTheme from '@hooking/useTheme';

export type Props = {
    index: number;
    active: boolean;
    open: boolean;
    Icon: FunctionComponent<SvgProps>;
    margin: number;
    padding: number;
    size?: number;
    onTouch: () => void;
};

const MainMenuItem = ({
    index,
    active,
    open,
    Icon,
    margin,
    padding,
    size = 35,
    onTouch,
}: Props) => {
    const theme = useTheme();

    const animatedTop = new Animated.Value(open ? margin : margin + ((size + margin) * index));
    const animatedRotate = new Animated.Value(open && index === 0 ? 180 : 0);

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
            toValue: open ? margin + ((size + margin) * index) : margin,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [open]);

    const rotate = animatedRotate.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const style: Animated.WithAnimatedObject<ViewStyle> = {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        top: animatedTop,
        right: margin,
        transform: [{rotate}],
        backgroundColor: theme.colors.viewSecondary,
        borderRadius: size / 2,
        elevation: index !== 0 && active ? 5 : 0,
    };

    return (
        <Animated.View
            style={style}
            onTouchEnd={onTouch}
        >
            <Icon
                width={size - padding}
                height={size - padding}
                fill={theme.colors.buttonSecondary}
            />
        </Animated.View>
    );
};

export default MainMenuItem;

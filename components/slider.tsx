import React, {useEffect, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent, PanResponder, StyleSheet} from 'react-native';
import {styled} from 'styled-components/native';
import type {SvgProps} from 'react-native-svg';
import {Text, View} from '@renative';
import useTheme from '@hooking/useTheme';
import useCenterAbsolute from '@hooking/useCenterAbsolute';
import {clamp, throttle} from '@utils/utils';
import type {StyledComponentProps} from '@typing/styled';
import SliderThumbIcon from '@res/slider_thumb_icon.svg';

type Props = {
    max: number;
    min?: number;
    disabled?: boolean;
    trackThickness?: number;
    thumbSize?: number;
    showAmount?: boolean;
    trackColor?: string;
    thumbColor?: string;
    thumbIcon?: React.FC<SvgProps>;
    setAmount: (amount: number) => void;
};

const Slider = ({
    max,
    min = 1,
    disabled = false,
    trackThickness = 10,
    thumbSize = 20,
    showAmount = true,
    trackColor,
    thumbColor,
    thumbIcon = SliderThumbIcon,
    setAmount,
}: Props) => {
    const theme = useTheme();
    const {translateX, translateY, onLayout} = useCenterAbsolute();
    const [thumbTranslateX, setThumbTranslateX] = useState<number>(0);
    const [step, setStep] = useState<number>(0);
    const pan = useRef(new Animated.ValueXY());
    const isDisabled = useRef<boolean>(disabled);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !isDisabled.current,
            onPanResponderMove: (_event, gestureState) => {
                pan.current.setValue({x: gestureState.dx, y: 0});
            },
            onPanResponderGrant: () => {
                pan.current.addListener(({x}: {x: number}) => throttle(() => setThumbTranslateX(x), 100));
            },
            onPanResponderRelease: () => {
                pan.current.removeAllListeners();
                pan.current.extractOffset();
            },
        })
    );

    if (disabled !== isDisabled.current) {
        isDisabled.current = disabled;
    }

    const onTrackLayout = (event: LayoutChangeEvent) => {
        const {width} = event.nativeEvent.layout;
        setStep(width / (max - min));
    };

    const ThumbIcon = thumbIcon;

    const steps = max - min;
    const maxTranslate = translateX + (step * steps);
    const animatedThumbTranslateX = Animated.add(pan.current.getTranslateTransform()[0].translateX, translateX).interpolate({
        inputRange: [translateX, maxTranslate],
        outputRange: [translateX, maxTranslate],
        extrapolate: 'clamp',
    });

    const clampedTranslateX = clamp(thumbTranslateX + translateX, 0, maxTranslate - translateX);
    const amount = maxTranslate > 0 ? Math.round(min + (clampedTranslateX / maxTranslate * steps)) : 1;

    useEffect(() => {
        setAmount(amount);
    }, [amount]);

    return (
        <View variants={['column']}>
            {showAmount && <Text variants={['header', 'center']}>{amount}</Text>}
            <StyledTrackView
                variants={['relative', 'bordered', 'rounded', 'justifyCenter', 'primary']}
                styled={{
                    color: trackColor,
                    thickness: trackThickness,
                }}
                onLayout={onTrackLayout}
            >
                <View>
                    <Animated.View
                        onLayout={onLayout}
                        style={[styles.thumb, {transform: [{translateX: animatedThumbTranslateX}, {translateY}]}]}
                        {...panResponder.current.panHandlers}
                    >
                        <ThumbIcon
                            width={thumbSize}
                            height={thumbSize}
                            fill={thumbColor ?? theme.colors.viewSecondary}
                        />
                    </Animated.View>
                </View>
            </StyledTrackView>
        </View>
    );
};

const styles = StyleSheet.create({
    thumb: {
        position: 'absolute',
    },
});

type StyledTrackProps = StyledComponentProps<{
    thickness: number;
    color?: string;
}>;

const StyledTrackView = styled(View)<StyledTrackProps>(({styled: {thickness, color}}) => ({
    height: thickness,
    backgroundColor: color,
}));

export default Slider;

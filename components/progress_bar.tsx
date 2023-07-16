import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {styled} from 'styled-components/native';
import {View} from '@renative';
import type {StyledComponentProps} from '@typing/styled';

type Props = {
    show: boolean;
    timerInMs: number;
    thickness?: number;
    containerColor?: string;
    progressColor?: string;
    onProgress?: (progress: number) => void,
    onComplete: () => void;
}

const ProgressBar = ({
    show,
    timerInMs,
    thickness = 28,
    containerColor,
    progressColor,
    onProgress,
    onComplete,
}: Props) => {
    const progress = useRef<number>(0);
    const animatedProgress = useRef<Animated.Value>(new Animated.Value(0));

    useEffect(() => {
        if (show && progress.current < 100) {
            const animation = Animated.timing(animatedProgress.current, {
                toValue: 100,
                duration: timerInMs,
                useNativeDriver: false,
            });
            animation.start();
        }
    }, [show]);

    useEffect(() => {
        animatedProgress.current.addListener(handleProgress);
        () => animatedProgress.current.removeAllListeners();
    }, []);

    const handleProgress = ({value: newProgress}: {value: number}) => {
        progress.current = newProgress;
        onProgress?.(newProgress);
        if (newProgress >= 100) {
            onComplete();
        }
    };

    if (!show) {
        return null;
    }

    const width = animatedProgress.current.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View
            variants={['bordered', 'rounded', 'primary']}
            style={{backgroundColor: containerColor}}
        >
            <View>
                <StyledProgressView
                    style={{width}}
                    styled={{
                        thickness,
                        color: progressColor,
                    }}
                />
            </View>
        </View>
    );
};

type StyledProps = StyledComponentProps<{
    thickness?: number;
    color?: string;
}>;

const StyledProgressView = styled(Animated.View)<StyledProps>(({styled: {thickness, color}, theme}) => ({
    height: thickness,
    backgroundColor: color ?? theme.colors.viewSecondary,
}));

export default ProgressBar;

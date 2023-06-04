import React, {FunctionComponent, useEffect} from 'react';
import {Animated} from 'react-native';
import {styled} from 'styled-components/native';
import {SvgProps} from 'react-native-svg';
import useTheme from '@hooking/useTheme';
import {StyledComponentProps} from '@typing/styled';

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

    return (
        <StyledMenuItemView
            style={{
                transform: [{rotate: animatedRotate.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                })}],
                top: animatedTop,
            }}
            onTouchEnd={onTouch}
            styled={{
                size,
                margin,
                index,
                active,
            }}
        >
            <Icon
                width={size - padding}
                height={size - padding}
                fill={theme.colors.buttonSecondary}
            />
        </StyledMenuItemView>
    );
};

type StyledMenuItemProps = StyledComponentProps<{
    size: number;
    margin: number;
    index: number;
    active: boolean;
}>;

const StyledMenuItemView = styled(Animated.View)<StyledMenuItemProps>(({styled: {size, margin, index, active}, theme}) => ({
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    right: margin,
    backgroundColor: theme.colors.viewSecondary,
    borderRadius: size / 2,
    elevation: index !== 0 && active ? '5' : '0',
}));

export default MainMenuItem;

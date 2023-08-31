import React, {useEffect, useRef, useState} from 'react';
import {
    Modal,
    View as NativeView, // eslint-disable-line no-restricted-imports
    Dimensions as NativeDimensions,
} from 'react-native';
import {styled} from 'styled-components/native';
import {Button, Text, View} from '@renative';
import {changeColorBrightness} from '@utils/renative';
import type {StyledComponentProps} from '@typing/styled';
import CheckIcon from '@res/check_icon.svg';

export type MenuItem = {
    text: string;
    selected?: boolean;
    rightDecorator?: JSX.Element;
    leftDecorator?: JSX.Element;
    onPress: () => void;
};

type Side = 'top' | 'bottom' | 'left' | 'right';

type Alignement = 'start' | 'end';

type Position = `${Side}-${Alignement}`;

type Measures = {
    width: number,
    height: number,
    pageX: number,
    pageY: number,
};

type Dimensions = {
    width: number;
    height: number;
};

type PositionStyle = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};

type Props = {
    open: boolean;
    name: string;
    position: Position;
    button: JSX.Element;
    header?: string | JSX.Element;
    items: MenuItem[];
    handleOpen: (open: boolean) => void;
};

const getPositionStyleFromPlacement = (measures: Measures, dimensions: Dimensions, position: Position): PositionStyle => {
    const margin = 5;
    switch (position) {
    case 'top-start':
        return {
            bottom: (dimensions.height - (measures.pageY + measures.height)) + margin,
            left: measures.pageX,
        };
    case 'top-end':
        return {
            bottom: (dimensions.height - (measures.pageY + measures.height)) + margin,
            right: dimensions.width - (measures.pageX + measures.width),
        };
    case 'bottom-start':
        return {
            top: measures.pageY + measures.height + margin,
            left: measures.pageX,
        };
    case 'bottom-end':
        return {
            top: measures.pageY + measures.height + margin,
            right: dimensions.width - (measures.pageX + measures.width),
        };
    case 'left-start':
        return {
            top: measures.pageY,
            right: (dimensions.width - measures.pageX) + margin,
        };
    case 'left-end':
        return {
            bottom: dimensions.height - (measures.pageY + measures.height),
            right: (dimensions.width - measures.pageX) + margin,
        };
    case 'right-start':
        return {
            top: measures.pageY,
            left: measures.pageX + measures.width + margin,
        };
    case 'right-end':
        return {
            bottom: dimensions.height - (measures.pageY + measures.height),
            left: measures.pageX + measures.width + margin,
        };
    default:
        return {};
    }
};

const Menu = ({open, name, position, button, header, items, handleOpen}: Props) => {
    const [positionStyle, setPositionStyle] = useState<PositionStyle>({top: -1});
    const menuButtonRef = useRef<NativeView>(null);
    const menuRef = useRef<NativeView>(null);

    useEffect(() => {
        if (!menuButtonRef.current) {
            return;
        }
        menuButtonRef.current.measure((_y, _x, width, height, pageX, pageY) => {
            if (!width || !height || !pageX || !pageY) {
                return;
            }
            const dimensions = NativeDimensions.get('window');
            const measures = {width, height, pageX, pageY};
            setPositionStyle(getPositionStyleFromPlacement(measures, dimensions, position));
        });
    }, [open]);

    const menuButton = React.cloneElement(button, {ref: menuButtonRef, disabled: !items.length});

    let renderedHeader;
    if (header) {
        renderedHeader = typeof header === 'string' ? (
            <Text
                variants={['header']}
                padding={{paddingHorizontal: 's', paddingVertical: 'xs'}}
            >
                {header}
            </Text>
        ) : header;
    }

    const renderedItems = items.map(({text, selected, rightDecorator, leftDecorator, onPress}, index) => (
        <StyledItemButton
            key={name + index}
            variants={['row', 'alignCenter']}
            padding={{paddingHorizontal: 's', paddingVertical: 'xs'}}
            styled={{selected}}
            onTouchEnd={onPress}
        >
            {leftDecorator}
            <Text>{text}</Text>
            {selected ? <StyledCheckIcon/> : rightDecorator}
        </StyledItemButton>
    ));

    if (positionStyle.top === -1) {
        return menuButton;
    }

    return (
        <>
            {menuButton}
            <Modal
                visible={open}
                transparent={true}
            >
                <View
                    variants={['flex']}
                    onTouchEnd={() => handleOpen(false)}
                >
                    <View
                        ref={menuRef}
                        variants={['absolute', 'primary', 'rounded', 'elevationHigh']}
                        padding={{paddingVertical: 'xs'}}
                        onTouchEnd={(e) => e.stopPropagation()}
                        style={positionStyle}
                    >
                        {renderedHeader}
                        {renderedItems}
                    </View>
                </View>
            </Modal>
        </>
    );
};

type StyledItemProps = StyledComponentProps<{
    selected?: boolean;
}>;

const StyledItemButton = styled(Button)<StyledItemProps>(({styled: {selected}, theme}) => ({
    backgroundColor: selected ? changeColorBrightness(theme.colors.viewPrimary, -0.07) : theme.colors.viewPrimary,
}));

const StyledCheckIcon = styled(CheckIcon)(({theme}) => ({
    width: 15,
    height: 15,
    fill: theme.colors.buttonPrimary,
}));

export default Menu;

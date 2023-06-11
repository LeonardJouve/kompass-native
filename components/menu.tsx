import React from 'react';
import {Placement, flip, shift, useFloating} from '@floating-ui/react-native';
import {styled} from 'styled-components/native';
import {View, Text, Button} from '@renative';
import {changeColorBrightness} from '@utils/renative';
import type {StyledComponentProps} from '@typing/styled';

export type MenuItem = {
    text: string;
    leftDecorator?: React.ReactNode;
    rightDecorator?: React.ReactNode;
    selected: boolean;
    onPress: () => void;
};

type Props = {
    open: boolean;
    placement: Placement,
    button: JSX.Element;
    header: string | JSX.Element;
    items: MenuItem[];
    name: string;
};

const Menu = ({open, placement, button, header, items, name}: Props) => {
    const {refs, floatingStyles} = useFloating({
        placement,
        middleware: [
            shift(),
            flip(),
        ],
    });

    const menuButton = React.cloneElement(button, {ref: refs.setReference});
    const renderedHeader = typeof header === 'string' ? <Text variants={['header']}>{header}</Text> : header;
    const renderedItems = items.map(({text, leftDecorator, rightDecorator, selected, onPress}, index) => (
        <StyledItemContainerView
            key={`${name}-menu-item-${index}`}
            variants={['row']}
            styled={{selected}}
        >
            {rightDecorator}
            <Button
                textVariants={['default']}
                text={text}
                onPress={onPress}
            />
            {leftDecorator}
        </StyledItemContainerView>
    ));

    return (
        <View>
            {menuButton}
            {open && (
                <View
                    ref={refs.setFloating}
                    variants={['primary', 'column']}
                    style={floatingStyles}
                >
                    <View>
                        {renderedHeader}
                        {renderedItems}
                    </View>
                </View>
            )}
        </View>
    );
};

type StyledItemContainerProps = StyledComponentProps<{
    selected: boolean;
}>;

const StyledItemContainerView = styled(View)<StyledItemContainerProps>(({styled: {selected}, theme}) => ({
    backgroundColor: selected ? changeColorBrightness(theme.colors.viewPrimary, -0.05) : theme.colors.viewPrimary,
}));

export default Menu;

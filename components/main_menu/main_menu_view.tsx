import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {styled} from 'styled-components/native';
import {View} from '@renative';
import {MainMenuSection} from '@components/main_menu/main_menu';
import MainMenuSettings from '@components/main_menu/main_menu_settings';
import MainMenuWeather from '@components/main_menu/main_menu_weather';
import MainMenuHelp from '@components/main_menu/main_menu_help';
import {MarginProp} from '@typing/theme';
import {StyledComponentProps} from '@typing/styled';

type Props = {
    activeSection: MainMenuSection,
    sectionIndex: number;
    itemSizeProps: {
        size: number;
        margin: number;
        padding: number;
    };
};

const MainMenuView = ({
    activeSection,
    itemSizeProps,
    sectionIndex,
}: Props) => {
    const top = useRef<number>((itemSizeProps.padding - itemSizeProps.margin) + ((itemSizeProps.size + itemSizeProps.margin)  * sectionIndex));
    const animatedTop = new Animated.Value(top.current);

    useEffect(() => {
        top.current = (itemSizeProps.padding - itemSizeProps.margin) + ((itemSizeProps.size + itemSizeProps.margin)  * sectionIndex);
        Animated.timing(animatedTop, {
            toValue: top.current,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [sectionIndex, itemSizeProps]);

    let content;
    switch (activeSection) {
    case MainMenuSection.SETTINGS:
        content = <MainMenuSettings/>;
        break;
    case MainMenuSection.WEATHER:
        content = <MainMenuWeather/>;
        break;
    case MainMenuSection.HELP:
        content = <MainMenuHelp/>;
        break;
    }

    const wrapperMargin: MarginProp = {
        margin: itemSizeProps.margin,
        marginRight: (itemSizeProps.margin * 2) + itemSizeProps.size,
    };

    if (sectionIndex === 0) {
        return null;
    }

    return (
        <View
            variants={['relative', 'flex', 'rounded', 'secondary']}
            margin={wrapperMargin}
            padding={{padding: 'm'}}
        >
            <StyledMainMenuView
                style={{top: animatedTop}}
                styled={itemSizeProps}
            />
            {content}
        </View>
    );
};

type StyledMainMenuProps = StyledComponentProps<{
    size: number;
    margin: number;
}>;

const StyledMainMenuView = styled(Animated.View)<StyledMainMenuProps>(({styled: {size, margin}, theme}) => ({
    position: 'absolute',
    right: -margin,
    borderTopWidth: size / 2,
    borderBottomWidth: size / 2,
    borderLeftWidth: margin,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: theme.colors.viewSecondary,
}));

export default MainMenuView;

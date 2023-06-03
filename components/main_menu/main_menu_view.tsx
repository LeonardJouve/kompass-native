import React, {useEffect, useRef} from 'react';
import {Animated, ViewStyle} from 'react-native';
import useTheme from '@hooking/useTheme';
import {View} from '@renative/index';
import {MainMenuSection} from '@components/main_menu/main_menu';
import MainMenuSettings from '@components/main_menu/main_menu_views/main_menu_settings';
import MainMenuWeather from '@components/main_menu/main_menu_views/main_menu_weather';
import MainMenuHelp from '@components/main_menu/main_menu_views/main_menu_help';
import {MarginProp} from '@typing/theme';

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
    const theme = useTheme();

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

    const arrowStyle: Animated.WithAnimatedObject<ViewStyle> = {
        position: 'absolute',
        top: animatedTop,
        right: -itemSizeProps.margin,
        borderTopWidth: itemSizeProps.size / 2,
        borderBottomWidth: itemSizeProps.size / 2,
        borderLeftWidth: itemSizeProps.margin,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: theme.colors.viewSecondary,
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
            <Animated.View style={arrowStyle}/>
            {content}
        </View>
    );
};

export default MainMenuView;

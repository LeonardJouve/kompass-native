import React, {useState} from 'react';
import {View} from '@renative';
import MainMenuItem from '@components/main_menu/main_menu_item';
import MainMenuView from '@components/main_menu/main_menu_view';
import {ViewVariant} from '@typing/theme';
import ToggleIcon from '@res/toggle_icon.svg';
import SettingsIcon from '@res/settings_icon.svg';
import WeatherIcon from '@res/weather_icon.svg';
import HelpIcon from '@res/help_icon.svg';

export enum MainMenuSection {
    TOGGLE = 'menu-toggle',
    SETTINGS = 'menu-settings',
    WEATHER = 'menu-weather',
    HELP = 'menu-help',
}

const itemSizeProps = {
    margin: 7,
    padding: 7,
    size: 35,
};

const itemsProps = [{
    key: MainMenuSection.TOGGLE,
    Icon: ToggleIcon,
}, {
    key: MainMenuSection.SETTINGS,
    Icon: SettingsIcon,
}, {
    key: MainMenuSection.WEATHER,
    Icon: WeatherIcon,
}, {
    key: MainMenuSection.HELP,
    Icon: HelpIcon,
}];

const MainMenu = () => {
    const [activeSection, setActiveSection] = useState<MainMenuSection>(MainMenuSection.TOGGLE);
    const [open, setOpen] = useState<boolean>(false);

    const items = itemsProps.map((itemProps, index) => {
        const active = activeSection === itemProps.key;
        const onTouch = () => {
            if (index === 0) {
                setOpen(!open);
            }
            setActiveSection(itemProps.key);
        };
        return (
            <MainMenuItem
                index={index}
                active={active}
                onTouch={onTouch}
                open={open}
                {...itemSizeProps}
                {...itemProps}
            />
        );
    }).reverse();

    const sectionIndex = itemsProps.findIndex((itemProps) => itemProps.key === activeSection);

    const wrapperVariants: ViewVariant[] = ['absolute', 'fullWidth'];
    if (sectionIndex !== 0) {
        wrapperVariants.push('fullHeight');
    }

    return (
        <View variants={wrapperVariants}>
            {items}
            <MainMenuView
                activeSection={activeSection}
                sectionIndex={sectionIndex}
                itemSizeProps={itemSizeProps}
            />
        </View>
    );
};

export default MainMenu;

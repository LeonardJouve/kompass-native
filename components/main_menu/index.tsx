import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@renative/index';
import MainMenuItem from '@components/main_menu/main_menu_item';
import ToggleIcon from '@res/toggle_icon.svg';
import SettingsIcon from '@res/settings_icon.svg';
import WeatherIcon from '@res/weather_icon.svg';
import HelpIcon from '@res/help_icon.svg';

const itemsProps = [{
    key: 'menu-toggle',
    Icon: ToggleIcon,
}, {
    key: 'menu-settings',
    Icon: SettingsIcon,
}, {
    key: 'menu-weather',
    Icon: WeatherIcon,
}, {
    key: 'menu-help',
    Icon: HelpIcon,
}];

const MainMenu = () => {
    const [activeItem, setActiveItem] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const items = itemsProps.map((itemProps, index) => {
        const active = activeItem === itemProps.key;
        const onTouch = () => {
            if (index === 0) {
                setOpen(!open);
            }
            setActiveItem(itemProps.key);
        };
        return (
            <MainMenuItem
                index={index}
                active={active}
                onTouch={onTouch}
                open={open}
                {...itemProps}
            />
        );
    }).reverse();

    return (
        <View
            variants={['absolute']}
            style={styles.wrapper}
        >
            {items}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        top: 0,
        right: 0,
    },
});

export default MainMenu;

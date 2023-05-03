import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import BackpackClose from '@components/backpack/backpack_close';
import Inventory from '@components/router/backpack_tabs/inventory';
import Craft from '@components/router/backpack_tabs/craft';
import Equipement from '@components/router/backpack_tabs/equipement';
import Encyclopedia from '@components/router/backpack_tabs/encyclopedia';
import InventoryIcon from '@res/inventory_icon.svg';
import CraftIcon from '@res/craft_icon.svg';
import EquipementIcon from '@res/equipement_icon.svg';
import EncyclopediaIcon from '@res/encyclopedia_icon.svg';
import {BackpackTabs, NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'Backpack'>

const Tab = createBottomTabNavigator<BackpackTabs>();

const ICONS: Record<keyof BackpackTabs, React.FC<SvgProps>> = {
    Inventory: InventoryIcon,
    Craft: CraftIcon,
    Equipement: EquipementIcon,
    Encyclopedia: EncyclopediaIcon,
};

const backpackClose = () => <BackpackClose/>;

const getTabOptions = ({route}: {route: RouteProp<BackpackTabs>}) => ({
    tabBarIcon: ({color, size}: {color: string, size: number}) => {
        const Icon = ICONS[route.name];
        return (
            <Icon
                fill={color}
                width={size}
                height={size}
            />
        );
    },
});

const Backpack = ({}: Props) => (
    <Tab.Navigator screenOptions={{header: backpackClose}}>
        <Tab.Screen
            name='Inventory'
            component={Inventory}
            options={getTabOptions}
        />
        <Tab.Screen
            name='Craft'
            component={Craft}
            options={getTabOptions}
        />
        <Tab.Screen
            name='Equipement'
            component={Equipement}
            options={getTabOptions}
        />
        <Tab.Screen
            name='Encyclopedia'
            component={Encyclopedia}
            options={getTabOptions}
        />
    </Tab.Navigator>
);

export default Backpack;

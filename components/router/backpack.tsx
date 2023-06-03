import React from 'react';
import {ViewStyle} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import {View} from '@renative';
import BackButton from '@components/back_button';
import Inventory from '@components/inventory';
import Craft from '@components/backpack_tabs/craft';
import Equipement from '@components/backpack_tabs/equipement';
import Encyclopedia from '@components/backpack_tabs/encyclopedia';
import useTheme from '@hooking/useTheme';
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

const backpackClose = () => <BackButton routeName='ExampleView'/>;

const getTabOptions = (routeName: keyof BackpackTabs, activeTint: string, inactiveTint: string) => ({
    header: backpackClose,
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color, size}: {focused: boolean, color: string, size: number}) => {
        const Icon = ICONS[routeName];
        const viewStyle: ViewStyle = {
            backgroundColor: focused ? inactiveTint : activeTint,
            width: size,
            height: size,
        };
        return (
            <View
                variants={['rounded', 'centered']}
                style={viewStyle}
            >
                <Icon
                    fill={color}
                    width={size - 5}
                    height={size - 5}
                />
            </View>
        );
    },
});

const Backpack = ({}: Props) => {
    const theme = useTheme();
    const screenOptions = ({route}: {route: RouteProp<BackpackTabs>}) => ({
        tabBarActiveTintColor: theme.colors.viewSecondary,
        tabBarInactiveTintColor: theme.colors.buttonSecondary,
        tabBarActiveBackgroundColor: theme.colors.viewSecondary,
        tabBarInactiveBackgroundColor: theme.colors.viewSecondary,
        ...getTabOptions(route.name, theme.colors.viewSecondary, theme.colors.buttonSecondary),
    });
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name='Inventory'
                component={Inventory}
            />
            <Tab.Screen
                name='Craft'
                component={Craft}
            />
            <Tab.Screen
                name='Equipement'
                component={Equipement}
            />
            <Tab.Screen
                name='Encyclopedia'
                component={Encyclopedia}
            />
        </Tab.Navigator>
    );
};

export default Backpack;

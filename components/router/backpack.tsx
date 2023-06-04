import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import {styled} from 'styled-components/native';
import {View} from '@renative/index';
import BackButton from '@components/back_button';
import Inventory from '@components/backpack_tabs/inventory';
import Craft from '@components/backpack_tabs/craft';
import Equipement from '@components/backpack_tabs/equipement';
import Encyclopedia from '@components/backpack_tabs/encyclopedia';
import useTheme from '@hooking/useTheme';
import InventoryIcon from '@res/inventory_icon.svg';
import CraftIcon from '@res/craft_icon.svg';
import EquipementIcon from '@res/equipement_icon.svg';
import EncyclopediaIcon from '@res/encyclopedia_icon.svg';
import {BackpackTabs, NavigationStack} from '@typing/navigation';
import type {StyledComponentProps} from '@typing/styled';

type Props = NativeStackScreenProps<NavigationStack, 'Backpack'>

const Tab = createBottomTabNavigator<BackpackTabs>();

const ICONS: Record<keyof BackpackTabs, React.FC<SvgProps>> = {
    Inventory: InventoryIcon,
    Craft: CraftIcon,
    Equipement: EquipementIcon,
    Encyclopedia: EncyclopediaIcon,
};

const backpackClose = () => <BackButton routeName='ExampleView'/>;

const getTabOptions = (routeName: keyof BackpackTabs) => ({
    header: backpackClose,
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color, size}: {focused: boolean, color: string, size: number}) => {
        const Icon = ICONS[routeName];
        return (
            <StyledTabOptionView
                variants={['rounded', 'centered']}
                styled={{
                    focused,
                    size,
                }}
            >
                <Icon
                    fill={color}
                    width={size - 5}
                    height={size - 5}
                />
            </StyledTabOptionView>
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
        ...getTabOptions(route.name),
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

type StyledTabOptionProps = StyledComponentProps<{
    focused: boolean;
    size: number;
}>;

const StyledTabOptionView = styled(View)<StyledTabOptionProps>(({styled: {focused, size}, theme}) => ({
    backgroundColor: focused ? theme.colors.buttonSecondary : theme.colors.viewSecondary,
    width: size,
    height: size,
}));

export default Backpack;

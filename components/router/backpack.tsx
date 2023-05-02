import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BackpackClose from '@components/backpack/backpack_close';
import Inventory from '@components/router/backpack_tabs/inventory';
import Craft from '@components/router/backpack_tabs/craft';
import Equipement from '@components/router/backpack_tabs/equipement';
import Encyclopedia from '@components/router/backpack_tabs/encyclopedia';
import {BackpackTabs, NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'Backpack'>

const Tab = createBottomTabNavigator<BackpackTabs>();

const Backpack = ({}: Props) => {
    return (
        <Tab.Navigator screenOptions={{header: () => <BackpackClose/>}}>
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

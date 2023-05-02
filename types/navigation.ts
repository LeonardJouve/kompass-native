import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type NavigationStack = {
    App: undefined;
    ExampleView: undefined;
    Backpack: undefined;
};

export type Navigation = NativeStackNavigationProp<NavigationStack>;

export type BackpackTabs = {
    Inventory: undefined;
    Craft: undefined;
    Equipement: undefined;
    Encyclopedia: undefined;
};

export type NavigationBackpackTabs = NativeStackNavigationProp<BackpackTabs>;

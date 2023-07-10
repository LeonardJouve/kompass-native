import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '@redux/store';
import {craftActions} from '@redux/craft';
import {View} from '@renative';
import CraftList from '@components/craft/craft_list';
import {BackpackTabs} from '@typing/navigation';

type Props = NativeStackScreenProps<BackpackTabs, 'Craft'>;

const Craft = ({}: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(craftActions.setAvailableCrafts({
            0: {
                id: 0,
                category: 'food',
                name: 'salad',
            },
            1: {
                id: 1,
                category: 'food',
                name: 'test',
            },
            2: {
                id: 2,
                category: 'food',
                name: 'test2',
            },
            3: {
                id: 3,
                category: 'food',
                name: 'test3',
            },
            4: {
                id: 4,
                category: 'food',
                name: 'test4',
            },
            5: {
                id: 5,
                category: 'food',
                name: 'test5',
            },
            6: {
                id: 6,
                category: 'food',
                name: 'test6',
            },
            7: {
                id: 7,
                category: 'food',
                name: 'test7',
            },
        }));
    }, []);

    return (
        <View variants={['flex', 'secondary']}>
            <CraftList/>
        </View>
    );
};

export default Craft;


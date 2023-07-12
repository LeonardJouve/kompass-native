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
        dispatch(craftActions.getCrafts());
    }, []);

    return (
        <View
            variants={['secondary', 'flex', 'closable']}
            padding={{paddingHorizontal: 's'}}
        >
            <CraftList/>
        </View>
    );
};

export default Craft;


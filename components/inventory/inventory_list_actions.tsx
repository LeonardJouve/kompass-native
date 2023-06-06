import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@renative';
import SplitButton from '@components/split_button';
import {useCenterAbsolute} from '@hooking/useCenterAbsolute';

const InventoryItemActions = () => {
    const {translateX, onLayout} = useCenterAbsolute();
    return (
        <View
            variants={['absolute']}
            style={styles.container}
        >
            <View
                onLayout={onLayout}
                variants={['secondary', 'row']}
                style={{transform: [{translateX}]}}
            >
                <SplitButton
                    name='inventory_list_actions'
                    options={[{icon: () => <View variants={['secondary']} margin={{margin: 'l'}}/>}]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        bottom: 10,
        left: '50%',
    },
});

export default InventoryItemActions;

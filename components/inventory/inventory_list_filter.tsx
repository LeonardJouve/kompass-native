import React from 'react';
import {StyleSheet} from 'react-native';
import {InventoryFilter} from '@typing/inventory';
import {Text, View} from '@components/renative';

type Props = {
    filter: InventoryFilter;
    setFilter: (filter: InventoryFilter) => void;
}

const InventoryListFilter = ({filter, setFilter}: Props) => {
    return (
        <View
            variants={['secondary']}
            padding={{paddingBottom: 'm'}}
            style={styles.container}
        >
            <Text>{'test'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
    },
});

export default InventoryListFilter;

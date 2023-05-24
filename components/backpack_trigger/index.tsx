import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {View} from '@renative/index';
import {Navigation} from '@typing/navigation';

const BackpackTrigger = () => {
    const navigation = useNavigation<Navigation>();
    const onTouch = () => navigation.navigate('Backpack');
    return (
        <View
            variants={['absolute']}
            style={styles.wrapper}
            onTouchEnd={onTouch}
        >
            <Image
                style={styles.image}
                source={require('@res/backpack.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        bottom: 0,
        right: 0,
    },
    image: {
        width: 150,
        height: 90,
    },
});

export default BackpackTrigger;

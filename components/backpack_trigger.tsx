import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {View} from '@renative';
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
            <FastImage
                source={require('@res/backpack.png')}
                style={styles.image}
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

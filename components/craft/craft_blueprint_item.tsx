import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from '@renative';
import Menu from '@components/menu';
import type {Ingredient} from '@typing/craft';

type Props = {
    ingredient: Ingredient;
};

const CraftBlueprintItem = ({ingredient}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const {type, min_tier: minTier} = ingredient;
    return (
        <Menu
            name='craft'
            position='bottom-start'
            open={open}
            button={(
                <Button
                    variants={['centered', 'rounded', 'bordered']}
                    onPress={() => setOpen(true)}
                    style={styles.button}
                >
                    <Text>{`${type} ${minTier}`}</Text>
                </Button>
            )}
            items={[
                {text: 'test', onPress: console.log},
            ]}
            handleOpen={setOpen}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
        backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
    },
});

export default CraftBlueprintItem;

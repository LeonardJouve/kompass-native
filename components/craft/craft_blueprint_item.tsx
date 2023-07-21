import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Text, View} from '@renative';
import Rest from '@api/rest';
import Menu from '@components/menu';
import type {Ingredient} from '@typing/craft';
import type {Item} from '@typing/inventory';

type Props = {
    ingredient: Ingredient;
    items: Item[];
    selectedItemId?: number;
    setSelectedItemId: (itemId: number) => void;
};

const CraftBlueprintItem = ({ingredient, items, selectedItemId, setSelectedItemId}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);

    const handleSelectItem = (item: Item) => {
        setSelectedItemId(item.item_id);
        setOpen(false);
    };

    const renderedItems = items.
        sort((a, b) => a.tier - b.tier).
        map((item) => ({
            leftDecorator: (
                <View variants={['row', 'alignCenter']}>
                    <Text>{item.amount}</Text>
                    <FastImage
                        source={{
                            uri: Rest.getItemImageRoute(item.item_id),
                            headers: {Authorization: `Bearer ${Rest.apiToken}`},
                        }}
                        style={styles.menuImage}
                    />
                </View>
            ),
            text: item.name,
            selected: selectedItemId === item.item_id,
            onPress: () => handleSelectItem(item),
        }));

    const previewUri = selectedItemId ? Rest.getItemImageRoute(selectedItemId) : Rest.getItemPreviewImageRoute(ingredient.type);

    return (
        <Menu
            name='craft_blueprint_'
            position='bottom-start'
            open={open}
            button={(
                <Button
                    variants={['centered', 'rounded', 'bordered']}
                    onPress={handleOpen}
                    style={styles.button}
                >
                    <FastImage
                        source={{
                            uri: previewUri,
                            headers: {Authorization: `Bearer ${Rest.apiToken}`},
                        }}
                        style={styles.image}
                    />
                </Button>
            )}
            items={renderedItems}
            handleOpen={setOpen}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
    },
    image: {
        flex: 1,
        aspectRatio: 1,
    },
    menuImage: {
        width: 20,
        height: 20,
    },
});

export default CraftBlueprintItem;

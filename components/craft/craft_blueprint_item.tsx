import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {Button, Text, View} from '@renative';
import Rest from '@api/rest';
import {getInventoryItemsWithType} from '@redux/selectors/inventory';
import Menu from '@components/menu';
import type {GlobalState} from '@typing/global_state';
import type {Ingredient} from '@typing/craft';
import type {Item} from '@typing/inventory';
import type {CraftSelectedItem} from '@typing/craft';

type Props = {
    ingredient: Ingredient;
    selectedItem?: CraftSelectedItem;
    setSelectedItem: (item: CraftSelectedItem) => void;
};

const CraftBlueprintItem = ({ingredient, selectedItem, setSelectedItem}: Props) => {
    const {type} = ingredient;
    const items = useSelector((state: GlobalState) => getInventoryItemsWithType(state, type));
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);

    const handleSelectItem = (item: Item) => {
        setSelectedItem({
            itemId: item.item_id,
            amount: item.amount,
        });
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
            selected: selectedItem?.itemId === item.item_id,
            onPress: () => handleSelectItem(item),
        }));

    const previewUri = selectedItem ? Rest.getItemImageRoute(selectedItem.itemId) : Rest.getItemPreviewImageRoute(ingredient.type);

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

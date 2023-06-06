import React from 'react';
import {styled} from 'styled-components/native';
import {Text, View} from '@renative';
import useFormattedMessage from '@hooking/useFormattedMessage';
import {changeColorBrightness} from '@utils/renative';
import type {InventoryCategoryName} from '@typing/inventory';

type Props = {
    index: number;
    categoryName: InventoryCategoryName;
};

const InventoryListHeader = ({categoryName, index}: Props) => {
    const formatMessage = useFormattedMessage();
    const header = formatMessage({
        id: `components.inventory_list.header.category_${categoryName}`,
        defaultMessage: categoryName,
    });
    return (
        <View variants={[index === 1 ? 'secondary' : 'primary']}>
            <StyledHeaderView
                margin={{marginTop: 'xs'}}
                padding={{paddingHorizontal: 'l', paddingVertical: 'm'}}
            >
                <Text variants={['default', 'header', 'center']}>
                    {header}
                </Text>
            </StyledHeaderView>
        </View>
    );
};

const StyledHeaderView = styled(View)(({theme}) => ({
    borderTopStartRadius: theme.spacing.xl,
    borderTopEndRadius: theme.spacing.xl,
    backgroundColor: changeColorBrightness(theme.colors.viewPrimary, -0.07),
}));

export default InventoryListHeader;

import React from 'react';
import {type ViewStyle} from 'react-native';
import {Text, View} from '@renative';
import type {TextVariant} from '@typing/theme';

type Props = {
    icon: JSX.Element;
    title?: string;
    subtitle?: string;
    textVariant?: TextVariant;
    style?: ViewStyle;
};

const NoResultIndicator = ({
    icon,
    title,
    subtitle,
    textVariant = 'default',
    style,
}: Props) => {
    return (
        <View
            variants={['flex', 'column', 'centered']}
            style={style}
        >
            {icon}
            <Text variants={[textVariant, 'header', 'textCenter']}>{title}</Text>
            <Text variants={[textVariant, 'textCenter']}>{subtitle}</Text>
        </View>
    );
};

export default NoResultIndicator;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative/index';
import BackButton from '@components/back_button';
import {NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'Register'>

const Register = ({}: Props) => {
    return (
        <View>
            <BackButton/>
            <Text>{'Register'}</Text>
        </View>
    );
};

export default Register;

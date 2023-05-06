import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from '@renative/index';
import BackButton from '@components/back_button';
import {NavigationStack} from '@typing/navigation';

type Props = NativeStackScreenProps<NavigationStack, 'ResetPassword'>

const ResetPassword = ({}: Props) => {
    return (
        <View>
            <BackButton/>
            <Text>{'Reset Password'}</Text>
        </View>
    );
};

export default ResetPassword;

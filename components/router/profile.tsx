import React from 'react';
import BackButton from '@components/back_button';
import Rest from '@api/rest';
import {Button, Text, View} from '@renative/index';
import useFormattedMessage from '@hooking/useFormattedMessage';

const Profile = () => {
    const formatMessage = useFormattedMessage();
    const handleDisconnect = () => Rest.disconnect();
    const header = formatMessage({
        id: 'components.profile.header.text',
        defaultMessage: 'Profile',
    });
    const disconnectText = formatMessage({
        id: 'components.profile.disconnect.text',
        defaultMessage: 'Diconnect',
    });
    return (
        <View
            variants={['primary', 'flex', 'column']}
            padding={{padding: 'l'}}
        >
            <BackButton/>
            <Text variants={['default', 'header', 'start']}>{header}</Text>
            <Button
                variants={['primary']}
                textVariants={['primary']}
                text={disconnectText}
                onPress={handleDisconnect}
            />
        </View>
    );
};

export default Profile;

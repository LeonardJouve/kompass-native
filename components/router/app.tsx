import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '@redux/store';
import {View, Button, Text} from '@renative/index';
import {languageActions} from '@redux/reducers/language';
import {modalActions} from '@redux/reducers/modal';
import {themeActions} from '@redux/reducers/theme';
import {initialFetch} from '@redux/actions/global';
import {getConfig} from '@redux/selectors/config';
import {getLanguage} from '@redux/selectors/laguage';
import Websocket from '@api/websocket';
import useTheme from '@hooking/useTheme';
import Tooltip from '@components/tooltip';
import {NavigationStack} from '@typing/navigation';
import {ModalIdentifiers} from '@typing/modals';

type Props = NativeStackScreenProps<NavigationStack, 'App'>;

function App({navigation}: Props): JSX.Element {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const {
        websocket_host: websocketHost,
        websocket_port: websocketPort,
        websocket_key: websocketKey,
    } = useSelector(getConfig);
    const language = useSelector(getLanguage);

    useEffect(() => {
        if (websocketHost && websocketPort && websocketKey) {
            Websocket.init(websocketHost, websocketPort, websocketKey);
            Websocket.listenToAll('channelName', console.log);
        }
    }, [websocketHost, websocketPort, websocketKey]);

    useEffect(() => {
        dispatch(initialFetch());
    }, [dispatch]);

    const changeTheme = () => dispatch(themeActions.setTheme(theme.type === 'dark' ? 'light' : 'dark'));

    const changeLanguage = () => dispatch(languageActions.setLanguage(language === 'en' ? 'fr' : 'en'));

    const openModal = () => dispatch(modalActions.openModal({modalId: ModalIdentifiers.ERROR, props: {id: 'components.error_modal.header', values: {}, url: 'http://url.ch', status: 422}}));

    const changeView = () => navigation.navigate('ExampleView');

    return (
        <View
            variants={['secondary', 'centered', 'fullHeight']}
            padding={{paddingLeft: 'xl'}}
        >
            <View
                variants={['column', 'centered', 'primary', 'fullWidth', 'fullHeight']}
                padding={{padding: 'm'}}
            >
                <Button
                    variants={['secondary']}
                    textVariants={['secondary']}
                    text='secondary'
                    onTouchEnd={changeTheme}
                />
                <Button
                    variants={['primary']}
                    textVariants={['primary']}
                    text='primary'
                    onTouchEnd={changeTheme}
                />
                <Button
                    variants={['primary']}
                    textVariants={['primary']}
                    text='Change language'
                    onPress={changeLanguage}
                />
                <Button
                    variants={['primary']}
                    textVariants={['primary']}
                    text='Open modal'
                    onPress={openModal}
                />
                <Button
                    variants={['primary']}
                    textVariants={['primary']}
                    text='Change view'
                    onPress={changeView}
                />
                <Tooltip tip='tip'>
                    <Text variants={['default']}>
                        {'Tooltip'}
                    </Text>
                </Tooltip>
            </View>
        </View>
    );
}

export default App;

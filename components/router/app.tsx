import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '@redux/store';
import {View, Button, Text} from '@renative';
import {configActions} from '@redux/config';
import {languageActions} from '@redux/language';
import {themeActions} from '@redux/theme';
import {getConfig} from '@redux/selectors/config';
import {getLanguage} from '@redux/selectors/laguage';
import Websocket from '@api/websocket';
import useTheme from '@hooking/useTheme';
import Tooltip from '@components/tooltip';
import {NavigationStack} from '@typing/navigation';

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
        dispatch(configActions.getConfig());
    }, []);

    const changeTheme = () => dispatch(themeActions.setTheme(theme.type === 'dark' ? 'light' : 'dark'));

    const changeLanguage = () => dispatch(languageActions.setLanguage(language === 'en' ? 'fr' : 'en'));

    const changeView = () => navigation.navigate('ExampleView');

    const handleLogin = () => navigation.navigate('Auth');

    return (
        <View
            variants={['secondary', 'centered', 'flex']}
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
                    onPress={changeTheme}
                />
                <Button
                    variants={['primary']}
                    textVariants={['primary']}
                    text='primary'
                    onPress={changeTheme}
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
                    text='Change view'
                    onPress={changeView}
                />
                <Button
                    variants={['primary']}
                    textVariants={['primary']}
                    text='Login'
                    onPress={handleLogin}
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

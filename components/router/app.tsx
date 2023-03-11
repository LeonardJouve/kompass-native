import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {languageActions} from '@redux/reducers/language';
import {modalActions} from '@redux/reducers/modal';
import {themeActions} from '@redux/reducers/theme';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FormattedMessage from '@components/formatted_message';
import Tooltip from '@components/tooltip';
import {NavigationStack} from '@typing/navigation';
import useTheme from '@hooking/useTheme';
import CustomButton from '@components/renative/button';
import CustomView from '@components/renative/view';
import {getTest} from '@redux/selectors/test';
import {getTest as getTestAction} from '@redux/actions/test';
import {useAppDispatch} from '@redux/store';
import {testActions} from '@redux/reducers/test';
import {ModalIdentifiers} from '@typing/modals';
import {initialFetch} from '@redux/actions/global';
import {getConfig} from '@redux/selectors/config';
import Websocket from '@api/websocket';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

type Props = NativeStackScreenProps<NavigationStack, 'App'>

function App({navigation}: Props): JSX.Element {
    const {websocket_host: websocketHost, websocket_port: websocketPort, websocket_key: websocketKey} = useSelector(getConfig);

    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useAppDispatch();

    const [myString, setMyString] = useState('state');
    const test = useSelector(getTest);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const theme = useTheme();

    useEffect(() => {
        if (websocketHost && websocketPort && websocketKey) {
            Websocket.init(websocketHost, websocketPort, websocketKey);
        }
    }, [websocketHost, websocketPort, websocketKey]);

    useEffect(() => {
        dispatch(initialFetch());
    }, [dispatch]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                style={backgroundStyle}>
                <Header />
                <View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
                    <View
                        style={[theme.variants.view.secondary, {paddingLeft: 70}]}
                        onTouchEnd={() => dispatch(themeActions.setTheme(theme.type === 'dark' ? 'light' : 'dark'))}
                    >
                        <CustomView variants={['row', 'centered', 'primary']}>
                            <CustomButton
                                variants={['secondary']}
                                textVariants={['secondary']}
                                text='secondary'
                            />
                            <CustomButton
                                variants={['primary']}
                                textVariants={['primary']}
                                text='primary'
                            />
                        </CustomView>
                    </View>
                    <CustomView variants={['row', 'centered', 'primary']}>
                        <CustomButton
                            variants={['primary']}
                            textVariants={['primary']}
                            text='fetch'
                            onPress={() => dispatch(getTestAction())}
                        />
                        <CustomButton
                            variants={['secondary']}
                            textVariants={['secondary']}
                            text='reset'
                            onPress={() => dispatch(testActions.setTest('intial test'))}
                        />
                    </CustomView>
                    <Text>{'test fetch: ' + test}</Text>
                    <Button
                        title=''
                        onPress={() => {
                            dispatch(languageActions.setLanguage('fr'));
                            setMyString(myString + ' test');
                        }}
                    />
                    <Text>{myString}</Text>
                    <FormattedMessage
                        id='test'
                        defaultMessage='cool {number}, {string}'
                        values={{number: 13, string: myString}}
                    />
                    <Button
                        title='Test modal'
                        onPress={() => dispatch(modalActions.openModal({modalId: ModalIdentifiers.ERROR, props: {id: 'components.error_modal.header', values: {}, url: 'http://url.ch', status: 422}}))}
                    />
                    <Button
                        title='Test'
                        onPress={() => navigation.navigate('Test')}
                    />
                    <View style={styles.smallView}>
                        <Tooltip tip='tool tip'>
                            <Text style={styles.text}>{'dwadwadwadwadwadwadawdwa'}</Text>
                        </Tooltip>
                    </View>
                    <Section title='See Your Changes'>
                        <ReloadInstructions />
                    </Section>
                    <Section title='Debug'>
                        <DebugInstructions />
                    </Section>
                    <Section title='Learn More'>
            Read the docs to discover what to do next:
                    </Section>
                    <LearnMoreLinks />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    text: {
        textAlign: 'left',
    },
    smallView: {
        width: 100,
    },
});

export default App;

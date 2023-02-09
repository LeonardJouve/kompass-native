import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {languageActions} from '@redux/reducers/language';
import {modalActions} from '@redux/reducers/modal';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FormattedMessage from '@components/formatted_message';
import TestModal from '@components/modals/test_modal';
import Tooltip from '@components/tooltip';
import {NavigationStack} from '@typing/navigation';

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
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();

    const [myString, setMyString] = useState('state');

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

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
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title='Step One'>
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
                    </Section>
                    <Button title='' onPress={() => {
                        dispatch(languageActions.setLanguage('fr'));
                        setMyString(myString + ' test');
                    }}/>
                    <Text>{myString}</Text>
                    <FormattedMessage id='test' defaultMessage='cool {number}, {string}' values={{number: 13, string: myString}}/>
                    <TestModal/>
                    <Button title='Test modal' onPress={() => dispatch(modalActions.openModal('test'))}/>
                    <Button title='Test' onPress={() => navigation.navigate('Test')}/>
                    <Tooltip tip='tool tip'>
                        <Text style={styles.text}>{'blabla'}</Text>
                    </Tooltip>
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
        textAlign: 'center',
    },
});

export default App;

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['module:react-native-dotenv', {
            moduleName: '@env',
            path: '.env',
        }],
        ['module-resolver', {
            'root': ['.'],
            'alias': {
                '@api': './api',
                '@components': './components',
                '@constants': './constants',
                '@hooking': './hooks',
                '@i18n': './i18n',
                '@renative': './components/renative',
                '@redux': './redux',
                '@typing': './types',
                '@utils': './utils',
            },
        }],
    ],
};

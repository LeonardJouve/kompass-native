module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['module:react-native-dotenv'],
        ['module-resolver', {
            'root': ['.'],
            'alias': {
                '@components': './components',
                '@hooking': './hooks',
                '@types': './types',
                '@i18n': './i18n',
                '@redux': './redux',
            },
        }],
    ],
};

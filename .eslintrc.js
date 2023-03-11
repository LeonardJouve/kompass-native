module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
        'prettier/prettier': 0,
        'semi': ['error', 'always'],
        'indent': ['error', 4],
        'object-curly-spacing': ['error', 'never'],
        'quotes': ['error', 'single'],
        'no-var': 'error',
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-max-props-per-line': ['error', {maximum: 1, when: 'always'}],
        'eqeqeq': ['error', 'always'],
        'no-restricted-imports': ['error', {
            paths: [
                {
                    name: 'react-redux',
                    importNames: ['useDispatch'],
                    message: 'Use useAppDispatch from @redux/store instead',
                },
                {
                    name: 'react-native',
                    importNames: ['Button', 'View', 'Text'],
                    message: 'Use @renative instead',
                },
            ],
        }],
    },
    overrides: [
        {
            files: ['redux/store.ts'],
            rules: {
                'no-restricted-imports': ['off', {
                    paths: [{
                        name: 'react-redux',
                        importNames: ['useDispatch'],
                    }],
                }],
            },
        },
        {
            files: ['components/renative/*'],
            rules: {
                'no-restricted-imports': ['off', {
                    paths: [{
                        name: 'react-native',
                        importNames: ['Button', 'View', 'Text'],
                    }],
                }],
            },
        },
    ],
};

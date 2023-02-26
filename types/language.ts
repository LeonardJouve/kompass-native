enum TranslationKeysEnum {
    'test',
    'components.generic_modal.confirm',
    'components.generic_modal.cancel',
}

export type TranslationKeys = Record<keyof typeof TranslationKeysEnum, string>;

export type TranslationKey = keyof TranslationKeys;

export type Languages = {
    'en': TranslationKeys,
    'fr': TranslationKeys,
}

export type LanguageKey = keyof Languages;

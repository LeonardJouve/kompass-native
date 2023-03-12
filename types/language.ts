enum TranslationKeysEnum {
    'components.generic_modal.confirm',
    'components.generic_modal.cancel',
    'components.error_modal.header',
    'components.error_modal.content',
    'api.rest.error.invalid_json'
}

export type TranslationKeys = Record<keyof typeof TranslationKeysEnum, string>;

export type TranslationKey = keyof TranslationKeys;

export type Languages = {
    'en': TranslationKeys,
    'fr': TranslationKeys,
}

export type LanguageKey = keyof Languages;

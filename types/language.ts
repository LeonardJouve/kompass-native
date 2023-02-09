export type TranslationKeys = {
    'test': string;
    'components.generic_modal.confirm': string;
    'components.generic_modal.cancel': string;
};

export type TranslationKey = keyof TranslationKeys;

export type Languages = {
    'en': TranslationKeys,
    'fr': TranslationKeys,
}

export type LanguageKey = keyof Languages;

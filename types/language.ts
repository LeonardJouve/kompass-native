enum TranslationKeysEnum {
    'components.generic_modal.confirm',
    'components.generic_modal.cancel',
    'components.auth.header.login',
    'components.auth.header.register',
    'components.auth.username.placeholder',
    'components.auth.email.placeholder',
    'components.auth.password.placeholder',
    'components.auth.password_confirm.placeholder',
    'components.auth.password_new.placeholder',
    'components.auth.password_new_confirm.placeholder',
    'components.auth.login.text',
    'components.auth.register.text',
    'components.profile.header.text',
    'components.profile.disconnect.text',
    'api.rest.error.invalid_json',
    'api.rest.error.token',
    'api.rest.error.auth.credentials',
    'api.rest.error.auth.password',
    'api.rest.error.auth.throttle',
    'error.generic',
}

export type TranslationKeys = Record<keyof typeof TranslationKeysEnum, string>;

export type TranslationKey = keyof TranslationKeys;

export type Languages = {
    'en': TranslationKeys,
    'fr': TranslationKeys,
}

export type LanguageKey = keyof Languages;

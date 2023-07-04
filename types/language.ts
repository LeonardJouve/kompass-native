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
    'components.auth.remember.text',
    'components.auth.error.email',
    'components.auth.error.password',
    'components.auth.error.password_confirm',
    'components.profile.header.text',
    'components.profile.disconnect.text',
    'components.text_input.error.required',
    'components.inventory_list.search.placeholder',
    'components.inventory_list.filter.menu.header',
    'components.inventory_list.filter.menu.category',
    'components.inventory_list.filter.menu.amount',
    'components.inventory_list.no_result.text',
    'components.inventory_list.no_result.search',
    'api.rest.error.invalid_json',
    'api.rest.error.token',
    'api.rest.error.auth.credentials',
    'api.rest.error.auth.password',
    'api.rest.error.auth.throttle',
    'api.rest.error.auth.invalid',
    'api.rest.error.not_found',
    'api.rest.error.unprocessable_entity',
    'api.rest.error.service_unavailable',
    'error.generic',
}

export type TranslationKeys = Record<keyof typeof TranslationKeysEnum, string>;

export type TranslationKey = keyof TranslationKeys;

export type Languages = {
    'en': TranslationKeys,
    'fr': TranslationKeys,
}

export type LanguageKey = keyof Languages;

export type FormattedMessage = {
    id: TranslationKey;
    defaultMessage: string;
    values?: Record<string, string | number | undefined>;
};

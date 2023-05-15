import BuildConfig from 'react-native-config';
import {NavigationContainerRef} from '@react-navigation/native';
import {ConfigState} from '@redux/reducers/config';
import {Options, Response, Error} from '@typing/rest';
import {Poi} from '@typing/map';
import {NavigationStack} from '@typing/navigation';

class Client {
    baseUrl: string;
    getNavigation?: () => NavigationContainerRef<NavigationStack> | null;
    xsrfToken?: string;
    apiToken?: string;

    constructor() {
        this.baseUrl = BuildConfig.API_URL!;
    }

    async fetch(url: string, options: Options): Response<any> {
        if (!this.xsrfToken) {
            await this.getCsrfToken();
        }
        if (!this.xsrfToken || !this.apiToken) {
            this.disconnect();
            return {
                data: {
                    id: 'api.rest.error.token',
                    defaultMessage: 'Unexpetceted error. Please reconnect.',
                },
                url,
                error: true,
            };
        }
        let headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': this.xsrfToken,
            'Authorization': `Bearer ${this.apiToken}`,
            ...options.headers,
        };
        const result = await fetch(url, {
            ...options,
            headers,
        });
        let data;
        try {
            data = await result.json();
        } catch (error) {
            return {
                data: {
                    id: 'api.rest.error.invalid_json',
                    defaultMessage: 'Received invalid response from the server.',
                },
                url,
                error: true,
                status: result.status,
            };
        }
        return {
            data,
            url,
            error: !result.ok,
            status: result.status,
        };
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getApiRoute() {
        return `${this.getBaseUrl()}/api`;
    }

    setNavigation(navigation: () => NavigationContainerRef<NavigationStack> | null) {
        this.getNavigation = navigation;
    }

    parseCookie (name: string, headers: Headers, decode = true): string | undefined {
        let value;
        const setCookieHeader = headers.get('set-cookie');
        if (setCookieHeader?.includes(name + '=')) {
            value = setCookieHeader.split(name + '=')[1].split(';')[0];
            if (decode) {
                value = decodeURIComponent(value);
            }
        }
        return value;
    }

    disconnect() {
        this.xsrfToken = undefined;
        this.apiToken = undefined;
        this.getNavigation?.()?.navigate('Auth');
    }

    async getCsrfToken() {
        const result = await fetch(
            `${this.getBaseUrl()}/sanctum/csrf-cookie`,
            {method: 'GET'},
        );
        this.xsrfToken = this.parseCookie('XSRF-TOKEN', result.headers);
    }

    async getTest(): Response<{test: string}> {
        return await this.fetch(
            `${this.getApiRoute()}/test`,
            {method: 'GET'},
        );
    }

    // TODO: remove
    async sendError(error: Omit<Error, 'error'>): Response<Record<string, any>> {
        return await this.fetch(
            `${this.getApiRoute()}/errors`,
            {method: 'POST', body: JSON.stringify(error)},
        );
    }

    async getConfig(): Response<ConfigState> {
        return await this.fetch(
            `${this.getApiRoute()}/config`,
            {method: 'GET'},
        );
    }

    async getPois(latitude: number, longitude: number): Response<Poi[]> {
        return await this.fetch(
            `${this.getApiRoute()}/opentripmap?latitude=${latitude}&longitude=${longitude}`,
            {method: 'GET'},
        );
    }

    // TODO: auth endpoints return type
    async login(email: string, password: string): Response<any> {
        let result = await this.fetch(
            `${this.getBaseUrl()}/login`,
            {method: 'POST', body: JSON.stringify({email, password})},
        );
        if (!result.error) {
            result = await this.getApiToken(email, password);
        }
        return result;
    }

    async register(name: string, email: string, password: string, password_confirmation: string): Response<any> {
        let result = await this.fetch(
            `${this.getBaseUrl()}/register`,
            {method: 'POST', body: JSON.stringify({name, email, password, password_confirmation})},
        );
        if (!result.error) {
            result = await this.getApiToken(email, password);
        }
        return result;
    }

    async resetPassword(email: string, password: string, password_confirmation: string): Response<any> {
        return await this.fetch(
            `${this.getBaseUrl()}/reset-password`,
            {method: 'POST', body: JSON.stringify({email, password, password_confirmation})},
        );
    }

    async getApiToken(email: string, password: string): Response<any> {
        const result = await this.fetch(
            `${this.getBaseUrl()}/token`,
            {method: 'POST', body: JSON.stringify({email, password})},
        );
        const {data, error} = result;
        if (!error && data.token) {
            this.apiToken = data.token;
        }
        return result;
    }
}

export default new Client();

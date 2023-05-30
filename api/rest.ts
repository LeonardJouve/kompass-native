import BuildConfig from 'react-native-config';
import {type ConfigState} from '@redux/config';
import {type Token} from '@redux/auth';
import type {Options, Response} from '@typing/rest';
import type {Poi} from '@typing/map';

class RestClient {
    public onDisconnect?: () => void;
    public apiToken?: string;
    baseUrl: string;

    constructor() {
        this.baseUrl = BuildConfig.API_URL!;
    }

    async fetch(url: string, options: Options, apiTokenRequired = true): Response<any> {
        if (!this.apiToken && apiTokenRequired) {
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
            ...options.headers,
        };
        if (apiTokenRequired) {
            headers.Authorization = `Bearer ${this.apiToken}`;
        }
        const result = await fetch(url, {
            ...options,
            headers,
        });
        const {ok, status} = result;
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
                status: status,
            };
        }
        return {
            data,
            url,
            error: !ok,
            status: status,
        };
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getApiRoute() {
        return `${this.getBaseUrl()}/api`;
    }

    public async disconnect() {
        this.apiToken = undefined;
        this.onDisconnect?.();
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

    async login(email: string, password: string): Response<Token> {
        return await this.fetch(
            `${this.getApiRoute()}/login`,
            {method: 'POST', body: JSON.stringify({email, password})},
            false,
        );
    }

    async register(name: string, email: string, password: string, passwordConfirm: string): Response<Token> {
        return await this.fetch(
            `${this.getApiRoute()}/register`,
            {method: 'POST', body: JSON.stringify({name, email, password, password_confirmation: passwordConfirm})},
            false,
        );
    }
}

const Rest = new RestClient();

export default Rest;

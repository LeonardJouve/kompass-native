import BuildConfig from 'react-native-config';
import {ConfigState} from '@redux/reducers/config';
import {Options, Response, Error, Status} from '@typing/rest';
import {Poi} from '@typing/map';

class Client {
    baseUrl: string;

    constructor() {
        this.baseUrl = BuildConfig.API_URL!;
    }

    async fetch(url: string, options: Options): Response<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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

    async getTest(): Response<{test: string}> {
        return await this.fetch(
            `${this.getApiRoute()}/test`,
            {method: 'GET'},
        );
    }

    async sendError(error: Omit<Error, 'error'>): Response<Record<string, any>> {
        return await this.fetch(
            `${this.getApiRoute()}/errors`,
            {method: 'POST', body: JSON.stringify(error)}
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
            {method: 'GET'}
        );
    }

    async login(email: string, password: string): Response<Status> {
        return await this.fetch(
            `${this.getBaseUrl()}/login`,
            {method: 'POST', body: JSON.stringify({email, password})}
        );
    }
}

export default new Client();

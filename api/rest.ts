import {Options, Response} from '@typing/rest';

class Client {
    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.BASE_URL!;
    }

    async fetch(route: string, options: Options): Response<any> {
        const result = await fetch(route, options);
        let data;
        try {
            data = await result.json();
        } catch (err) {
            return {
                data: {
                    id: 'api.rest.error.invalid_json',
                    message: 'Received invalid response from the server.',
                },
                error: true,
                status: 422,
            };
        }
        return {
            data,
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
}

export default new Client();

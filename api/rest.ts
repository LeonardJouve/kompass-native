import BuildConfig from 'react-native-config';
import type {ConfigState} from '@redux/config';
import type {Token} from '@redux/auth';
import type {Options, Response, Status} from '@typing/rest';
import type {AvailableItem, Item, ItemType} from '@typing/inventory';
import type {Poi} from '@typing/map';
import type {Craft, CraftResponse} from '@typing/craft';

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

    public disconnect() {
        this.apiToken = undefined;
        this.onDisconnect?.();
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getApiRoute() {
        return `${this.getBaseUrl()}/api`;
    }

    getAuthRoute() {
        return `${this.getApiRoute()}/auth`;
    }

    getItemsRoute() {
        return `${this.getApiRoute()}/items`;
    }

    getOpentripmapRoute() {
        return `${this.getApiRoute()}/opentripmap`;
    }

    getItemImageRoute(itemId: number) {
        return `${this.getItemsRoute()}/image/${itemId}`;
    }

    getItemPreviewImageRoute(type: ItemType) {
        return `${this.getItemsRoute()}/image-preview/${type}`;
    }

    getCraftsRoute() {
        return `${this.getApiRoute()}/crafts`;
    }

    getConfig(): Response<ConfigState> {
        return this.fetch(
            `${this.getApiRoute()}/config`,
            {method: 'GET'},
        );
    }

    login(email: string, password: string): Response<Token> {
        return this.fetch(
            `${this.getAuthRoute()}/login`,
            {method: 'POST', body: JSON.stringify({email, password})},
            false,
        );
    }

    register(name: string, email: string, password: string, passwordConfirm: string): Response<Token> {
        return this.fetch(
            `${this.getAuthRoute()}/register`,
            {method: 'POST', body: JSON.stringify({name, email, password, password_confirmation: passwordConfirm})},
            false,
        );
    }

    getItems(): Response<Item[]> {
        return this.fetch(
            this.getItemsRoute(),
            {method: 'GET'},
        );
    }

    deleteItem(itemId: number, amount: number): Response<Status> {
        return this.fetch(
            `${this.getItemsRoute()}/${itemId}?amount=${amount}`,
            {method: 'DELETE'},
        );
    }

    getPois(latitude: number, longitude: number): Response<Poi[]> {
        return this.fetch(
            `${this.getOpentripmapRoute()}?latitude=${latitude}&longitude=${longitude}`,
            {method: 'GET'},
        );
    }

    searchPoi(xid: string): Response<Poi[]> {
        return this.fetch(
            `${this.getOpentripmapRoute()}/search?xid=${xid}`,
            {method: 'GET'},
        );
    }

    getCrafts(): Response<Craft[]> {
        return this.fetch(
            this.getCraftsRoute(),
            {method: 'GET'},
        );
    }

    getCraftPreview(craftId: number, selectedItemsId: number[]): Response<AvailableItem> {
        return this.fetch(
            `${this.getCraftsRoute()}/preview`,
            {method: 'PUT', body: JSON.stringify({craft_id: craftId, selected_items_id: selectedItemsId})},
        );
    }

    craft(craftId: number, selectedItemsId: number[], amount: number): Response<CraftResponse> {
        return this.fetch(
            `${this.getCraftsRoute()}`,
            {method: 'POST', body: JSON.stringify({craft_id: craftId, selected_items_id: selectedItemsId, amount})},
        );
    }
}

const Rest = new RestClient();

export default Rest;

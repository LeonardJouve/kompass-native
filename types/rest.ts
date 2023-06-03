enum Methods {
    GET,
    POST,
    PUT,
    DELETE,
}

type Result<T> = {
    error: false;
    data: T;
    url: string;
    status: number;
};

export type Error = {
    error: true;
    data: any;
    url: string;
    status?: number;
};

export type Options = {
    method: keyof typeof Methods;
    headers?: {[x: string]: string};
    body?: string;
};

export type Status = {
    status: 'ok';
};

export type Response<T> = Promise<Result<T> | Error>;

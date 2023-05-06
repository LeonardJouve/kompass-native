enum Methods {
    GET,
    POST,
    PUT,
    DELETE,
}

type Result<T> = {
    data: T;
    url: string;
    error: false;
    status: number;
};

export type Error = {
    data: any;
    url: string;
    error: true;
    status: number;
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

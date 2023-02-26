enum Methods {
    GET,
    POST,
    PUT,
    DELETE,
}

type Result<T> = {
    data: T;
    error: false;
    status: number;
};

type Error = {
    data: {
        id: string;
        message: string;
    };
    error: true;
    status: number;
};

export type Options = {
    headers?: {[x: string]: string};
    method: keyof typeof Methods;
};

export type Response<T> = Promise<Result<T> | Error>;

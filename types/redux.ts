export enum ActionStatus {
    ERROR = 'error',
    OK = 'ok',
}

export type ActionFulfilled<T = undefined> = T extends undefined ? {
    status: ActionStatus.OK;
} : {
    status: ActionStatus.OK;
    data: T;
};

export type ActionRejected<T = undefined> = T extends undefined ? {
    rejectValue: {
        status: ActionStatus.ERROR
    }
} : {
    rejectValue: {
        status: ActionStatus.ERROR,
        data: T;
    }
};

export type OneToOneIdObject<T> = Record<string, T>;

export type OneToManyIdObject<T> = Record<string, T[]>;

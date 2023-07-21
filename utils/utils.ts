export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

let throttleTimeout: NodeJS.Timeout|null = null;
export const throttle = (callback: () => void, delay: number) => {
    const execute = () => {
        callback();
        throttleTimeout = setTimeout(() => {
            throttleTimeout = null;
        }, delay);
    };
    if (throttleTimeout) {
        clearTimeout(throttleTimeout);
        throttleTimeout = setTimeout(() => {
            execute();
        }, delay);
        return;
    }
    execute();
};

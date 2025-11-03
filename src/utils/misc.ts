export const guid = () => {
    // guid()
    // => "563befe9-405e-0e52-6779-9fad2f181678"
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export const parseHost = (url: string) => {
    try {
        return new URL(url).hostname;
    } catch (err) {
        return `Couldn't parse hostname`
    }
};

export const asyncIterableToArray = async <T>(iter: AsyncIterable<T>): Promise<T[]> => {
    const res: T[] = [];
    for await (const val of iter) {
        res.push(val);
    }
    return res;
};

export const lazyAsyncVariable = <T>(init: () => Promise<T>) => {
    let promise: Promise<T> | undefined = undefined;

    return {
        get: () => {
            if (!promise) promise = init();
            return promise;
        },
    }
};

export function debounce(func: () => unknown, timeout = 300){
    let timer: NodeJS.Timeout;
    return (...args: unknown[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { // @ts-ignore
            func.apply(this, args); }, timeout);
    };
}
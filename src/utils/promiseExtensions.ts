Promise.prototype.timeout = function <T>(ms: number, timeoutError: string = 'Promise timed out'): Promise<T> {
    return Promise.race([
        this,
        new Promise<T>((_, rej) => setTimeout(() => rej(new Error(timeoutError)), ms)),
    ]);
};

Promise.prototype.finallyCatch = function <T>(callback: (error: any) => void): Promise<T> {
    return this.catch((error) => {
        callback(error);
        throw error;
    });
};

Promise.prototype.to = async function <T>(): Promise<[any, T | undefined]> {
    try {
        return [null, await this];
    } catch (error) {
        return [error, undefined];
    }
};

Promise.prototype.retry = function <T>(retries: number, delay: number): Promise<T> {
    return new Promise((res, rej) => {
        const attempt = (retriesLeft: number) => {
            this.then(res)
                .catch((error) => {
                    retriesLeft <= 0
                        ? rej(error)
                        : setTimeout(() => attempt(retriesLeft - 1), delay);
                });
        };
        attempt(retries);
    });
};

Promise.prototype.series = function <T>(promises: (() => Promise<T>)[]): Promise<T[]> {
    const results: T[] = [];
    for (const promise of promises) promise().then(result => results.push(result));
    return Promise.resolve(results);
};
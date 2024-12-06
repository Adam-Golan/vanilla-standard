export class API {
    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT'];
    private cache: Map<string, any> = new Map();

    /**
     * Constructs an API instance with the specified service URL, headers, and cache duration.
     * It dynamically assigns HTTP methods to the instance for making requests.
     * @param service The base URL for the API service. Defaults to the origin of the current location.
     * @param headers The default headers to include with each request. Defaults to an empty object.
     * @param cacheDuration The duration in milliseconds for which responses are cached. Defaults to 5 minutes.
     */
    constructor(private service: string = location.origin, private headers: HeadersInit = {}, private cacheDuration: number = 1000 * 60 * 5) {
        for (const method of this.methods) {
            if (['OPTIONS', 'CONNECT'].includes(method)) {
                (API as any)[method] = <T = any>(action: string, requestHeaders?: HeadersInit) => {
                    return this.baseRequest<T>(action, this.createInit(method, '', requestHeaders));
                };
            } else {
                (API as any)[method] = <T = any>(action: string, payload: string, requestHeaders?: HeadersInit, params?: { [key: string]: string }) => {
                    if (params) action = this.getUrl(action, params);
                    return this.baseRequest<T>(action, this.createInit(method, payload, requestHeaders));
                };
            }
        }
    }

    /**
     * Return the URL for a given action and params.
     * If params is an empty object, just return the action.
     * Otherwise, return the action followed by a query string built from the
     * key-value pairs in params.
     * @param action The base URL for the request.
     * @param params An object of key-value pairs that will be appended to the
     * URL as a query string.
     * @returns The URL for the request.
     */
    private getUrl(action: string, params: { [key: string]: string }): string {
        if (typeof action !== 'string') throw new Error('Action must be a string.');
        return Object.keys(params).length
            ? `${action}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`
            : action;
    }

    /**
     * Creates a RequestInit object for making HTTP requests with the specified method, payload, and headers.
     * Throws an error if the payload is not provided for methods that require a payload.
     *
     * @param method - The HTTP method to use for the request (e.g., 'GET', 'POST').
     * @param payload - The request payload, used as the body of the request for methods other than 'GET', 'HEAD', and 'OPTIONS'.
     * @param requestHeaders - Additional headers to include in the request. Default is an empty object.
     * @returns A RequestInit object configured with the specified method, headers, and body.
     * @throws Error if the payload is not provided for requests requiring a payload.
     */
    private createInit(method: API['methods'][number], payload: string, requestHeaders: HeadersInit = {}): RequestInit {
        if (payload === undefined && !['GET', 'HEAD', 'OPTIONS'].includes(method)) throw new Error(`Payload is required for ${method} requests.`);
        if (payload !== undefined && typeof payload !== 'string') throw new Error('Payload must be a string.');
        return {
            headers: { 'Content-Type': 'application/json', ...this.headers, ...requestHeaders },
            method,
            body: method === 'GET' || method === 'HEAD' || method === 'OPTIONS' ? null : payload
        }
    }

    /**
     * Makes a request to the server with the given action and RequestInit object.
     * If the request is successful, it caches the response for the given cache duration.
     * If the request fails, it logs the error and the request details to the console.
     * @param action The URL for the request. The service URL is prepended to this.
     * @param init The RequestInit object to be used for the request.
     * @returns A Promise that resolves with the response JSON or rejects with an Error.
     */
    private baseRequest<T>(action: string, init: RequestInit): Promise<T> {
        const cacheKey = `${action}_${JSON.stringify(init)}`;
        if (this.cache.has(cacheKey)) return Promise.resolve(this.cache.get(cacheKey));
        return fetch(`${this.service}/${action}`, init)
            .then(async res => {
                if (res.ok) {
                    try {
                        return await res.json();
                    } catch (err) {
                        throw new Error(`Failed to parse response: ${err}`);
                    }
                } else {
                    try {
                        throw new Error((await res.json()).message);
                    } catch (err) {
                        throw new Error(`Failed to parse error response: ${err}`);
                    }
                }
            })
            .then(data => {
                this.cache.set(cacheKey, data);
                setTimeout(() => this.cache.delete(cacheKey), this.cacheDuration);
                return data;
            })
            .catch(err => {
                console.error(`API ${action} request failed:\n`, `${init.method}: ${this.service}/${action}\n`, `Error: ${err}`);
                throw err;
            });
    }
}

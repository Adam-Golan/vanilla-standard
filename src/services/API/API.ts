export class API {
    constructor(private service: string = location.origin, private headers?: HeadersInit) { }

    GET<T = any>(action: string, requestHeaders?: HeadersInit) {
        return this.baseRequest<T>(action, this.createInit('GET', '', requestHeaders));
    }
    POST<T = any>(action: string, payload: string, requestHeaders?: HeadersInit) {
        return this.baseRequest<T>(action, this.createInit('POST', payload, requestHeaders));
    }
    PUT<T = any>(action: string, payload: string, requestHeaders?: HeadersInit) {
        return this.baseRequest<T>(action, this.createInit('PUT', payload, requestHeaders));
    }
    PATCH<T = any>(action: string, payload: string, requestHeaders?: HeadersInit) {
        return this.baseRequest<T>(action, this.createInit('PATCH', payload, requestHeaders));
    }
    DELETE<T = any>(action: string, payload: string, requestHeaders?: HeadersInit) {
        return this.baseRequest<T>(action, this.createInit('DELETE', payload, requestHeaders));
    }

    private createInit(method: keyof API, payload: string, requestHeaders?: HeadersInit): RequestInit {
        return {
            headers: { 'Content-Type': 'application/json', ...this.headers, ...(requestHeaders ?? {}) },
            method,
            body: method === 'GET' ? null : payload
        }
    }

    private baseRequest<T>(action: string, init: RequestInit): Promise<T> {
        return fetch(`${this.service}/${action}`, init).then(async res => {
            if (res.ok) return res.json(); else throw Error(await res.json());
        });
    }
}
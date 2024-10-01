export class API {
    constructor(private service: string = location.origin) { }

    GET<T = any>(action: string) {
        return this.baseRequest<T>(action, this.createInit('GET', ''));
    }
    POST<T = any>(action: string, payload: string) {
        return this.baseRequest<T>(action, this.createInit('POST', payload));
    }
    PUT<T = any>(action: string, payload: string) {
        return this.baseRequest<T>(action, this.createInit('PUT', payload));
    }
    PATCH<T = any>(action: string, payload: string) {
        return this.baseRequest<T>(action, this.createInit('PATCH', payload));
    }
    DELETE<T = any>(action: string, payload: string) {
        return this.baseRequest<T>(action, this.createInit('DELETE', payload));
    }

    private createInit(method: keyof API, payload: string): RequestInit {
        return {
            headers: { 'Content-Type': 'application/json' },
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
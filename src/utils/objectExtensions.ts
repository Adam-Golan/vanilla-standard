Object.prototype.cloneDeep = function (): object {
    if (typeof structuredClone === 'function') return structuredClone(this);
    const clone = (obj: any): any => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map((item) => clone(item));
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Map) return new Map(Array.from(obj.entries()).map(([key, value]) => [clone(key), clone(value)]));
        if (obj instanceof Set) return new Set(Array.from(obj).map((item) => clone(item)));
        const clonedObj = Object.create(Object.getPrototypeOf(obj));
        for (const key of Object.keys(obj)) clonedObj[key] = clone(obj[key]);
        return clonedObj;
    };
    return clone(this);
};

Object.prototype.isEmpty = function (): boolean {
    return Object.keys(this).length === 0;
};

Object.prototype.mergeDeep = function (source: object): object {
    const merge = (target: any, source: any): any => {
        if (source == null || typeof source !== 'object') return target;
        Object.keys(source).forEach((key) => {
            source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
                ? target[key] = merge(target[key] || {}, source[key])
                : target[key] = source[key];
        });
        return target;
    };
    if (typeof structuredClone === 'function') {
        const clone = structuredClone(this);
        return Object.assign(clone, merge(clone, source));
    }
    return merge(this, source);
};

Object.prototype.getPath = function <T, K extends keyof T>(this: T, path: string): any {
    const keys = path.split('.') as K[];
    let current: any = this;
    for (const key of keys) {
        if (current == null || !(key in current)) return undefined;
        current = current[key];
    }
    return current;
};

Object.prototype.omit = function <T>(...keys: (keyof ThisType<T>)[]): object {
    const result = { ...this };
    keys.forEach((key) => delete result[key]);
    return result;
};

Object.prototype.pick = function <T>(...keys: (keyof ThisType<T>)[]): object {
    return keys.reduce((acc, key) => {
        if (key in this) acc[key] = this[key];
        return acc;
    }, {});
};

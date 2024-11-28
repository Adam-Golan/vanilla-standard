Object.defineProperty(Array.prototype, 'last', {
    get: function () {
        return this[this.length - 1];
    },
    set: function (value: any) {
        this[this.length - 1] = value;
    },
    configurable: false,
    enumerable: false
});
Object.defineProperty(Array.prototype, 'first', {
    get() {
        return this[0];
    },
    set: function (value: any) {
        this[0] = value;
    },
    configurable: false,
    enumerable: false,
});

Array.prototype.avg = function (): number {
    return this.reduce((sum, val) => sum + val, 0) / this.length;
};

Array.prototype.chunk = function (size: number) {
    return Array.from({ length: Math.ceil(this.length / size) }, (_, i) =>
        this.slice(i * size, i * size + size)
    );
};

Array.prototype.unique = function () {
    return [...new Set(this)];
};

Array.prototype.remove = function <T>(value: T) {
    const idx = this.indexOf(value);
    if (idx > -1) this.splice(idx, 1);
    return this;
};

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

Array.prototype.groupBy = function <T, K extends keyof T>(fn: (item: T) => T[K]): { [k: string]: T[] } {
    return this.reduce((acc, val) => {
        const key = fn(val);
        (acc[key] = acc[key] || []).push(val);
        return acc;
    }, {});
};

Array.prototype.countBy = function<T, K extends keyof T> (fn: (item: T) => T[K]): { [k: string]: number } {
    return this.reduce((acc, val) => {
        const key = fn(val);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string | number, number>);
};


Array.prototype.diff = function (arr: any[]) {
    return this.filter(x => !arr.includes(x));
};

Array.prototype.intersect = function (arr: any[]) {
    return this.filter(x => arr.includes(x));
};

Array.prototype.rotate = function<T> (steps: number): T[] {
    const len = this.length;
    const normalizedSteps = ((steps % len) + len) % len; // Handle negative or large steps
    return this.slice(normalizedSteps).concat(this.slice(0, normalizedSteps));
};
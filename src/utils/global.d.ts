declare global {
    interface String {
        capitalize(): string;
        titleCase(): string;
        addSpaces(type: 'uppercase' | '-' | '_' | '/'): string;
        remove(substr): string;
        snakeCase(): string;
        kebabCase(): string;
        reverse(): string;
        superTrim(): string;
        isPalindrome(): boolean;
        count(substr: string): number;
        truncate(len: number): string;
    }

    interface Number {
        isEven(): boolean;
        isOdd(): boolean;
        isPrime(): boolean;
        toOrdinal(): string;
        factorial(): number;
        toRoman(): string | null;
        clamp(min: number, max: number): number;
        toCurrency(locale: string, currency: string): string;
        roundToNearest(multiple: number): number;
    }

    interface Date {
        getTimeDiff(b: Date): IDateTimeDiff;
        toISODateString(): string;
        isLeapYear(): boolean;
        isSameDay(date: Date): boolean;
        daysBetween(date: Date): number;
        add(type: 'y' | 'm' | 'd', value: number): Date;
        subtract(type: 'y' | 'm' | 'd', value: number): Date;
    }

    interface Array<T> {
        first: T;
        last: T;
        avg(): number;
        chunk(size: number): T[][];
        unique(): T[];
        shuffle(): T[];
        remove<T>(value: T): T[];
        diff(value: any[]): any[];
        intersect(value: any[]): any[];
        rotate<T>(steps: number): T[];
        groupBy<T, K extends keyof T>(fn: (item: T) => typeof T[K]): { [k: string]: T[] };
        countBy<T, K extends keyof T>(fn: (item: T) => typeof T[K]): { [k: string]: number };
    }

    interface Object {
        cloneDeep(): object;
        mergeDeep(source: object): object;
        isEmpty(): boolean;
        omit<T>(...keys: (keyof ThisType<T>)[]): object;
        pick<T>(...keys: (keyof ThisType<T>)[]): object;
        getPath<T, K extends keyof T>(this: T, path: string): any;
    }

    interface Set<T> {
        union(set: Set<T>): Set<T>;
        intersect(set: Set<T>): Set<T>;
        diff(set: Set<T>): Set<T>;
        isSubset(set: Set<T>): boolean;
        symmetricDiff(set: Set<T>): Set<T>;
    }

    interface Map<K, V> {
        invert(): Map<V, K>;
        filter(cb: (value: V, key: K, map: Map<K, V>) => boolean): Map<K, V>;
        setMap(keys: K[], values: V[]): Map<K, V>;
        changeKeys(cb: (key: K, value: V, map: Map<K, V>) => K): Map<K, V>;
        changeValues(cb: (key: K, value: V, map: Map<K, V>) => V): Map<K, V>;
        toObject<K extends string | number | symbol, V>(): Record<K, V>;
    }

    interface BigInt {
        factorial(): bigint;
        isPrime(): boolean;
        toDecimalString(): string;
    }

    interface JSON {
        safeParse<T>(jsonString: string, defaultValue: T): T;
        deepCopy<T>(obj: T): T;
        pretty<T>(value: T, indent: number = 2): string;
    }

    interface Function {
        debounce(delay: number): (...args: any[]) => void;
        throttle(delay: number): (...args: any[]) => void;
        once(): (...args: any[]) => any;
    }
    interface Promise<T = any> {
        timeout(ms: number, timeoutError: string = 'Promise timed out'): Promise<T>;
        finallyCatch(callback: (error: any) => void): Promise<T>;
        async to(): Promise<[any, T | undefined]>;
        retry(retries: number, delay: number): Promise<T>;
        series(promises: (() => Promise<T>)[]): Promise<T[]>;
    }

    interface RegExp {
        testAsync(str: string): Promise<boolean>;
    }

}

export { };
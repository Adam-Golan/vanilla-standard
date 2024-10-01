export class State {
    subscribers: { [k: string]: ((...args: any[]) => void)[] } = {};
    data: { [k: string]: any } = {};

    setData<T = any>(name: string, value: T): void {
        this.data[name] = value;
    }
    getData<T = any>(name: string): T {
        return this.data[name];
    }
    publish(name: string, ...args: any[]): void {
        this.subscribers[name].forEach(func => func(...args));
    }
    subscribe(name: string, func: (...args: any[]) => void): void {
        this.subscribers[name]?.length
            ? this.subscribers[name].push(func)
            : this.subscribers[name] = [func];
    }
    unsubscribe(name: string, func: (...args: any[]) => void): void {
        if (this.subscribers[name]?.length) {
            const idx = this.subscribers[name].indexOf(func);
            if (idx > -1) this.subscribers[name].splice(idx, 1);
        }
    }
    unsubscribeAll(name: string): void {
        delete this.subscribers[name];
    }
}
export class State<StateStructure = Record<string, any>> {
    subscribers: { [k: string]: ((...args: any[]) => void)[] } = {};
    data: Partial<StateStructure> = {};

    setData<K extends keyof StateStructure>(name: K, value: StateStructure[K]): void {
        this.data[name] = value;
    }
    
    getData<K extends keyof StateStructure>(name: K): StateStructure[K] | undefined {
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
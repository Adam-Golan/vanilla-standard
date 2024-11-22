export class State<IState = Record<string, any>> {
    private data: Map<keyof IState, IState[keyof IState]> = new Map();
    private subscribers: Map<string, ((...args: any[]) => void)[]> = new Map();

    setData(name: keyof IState, value: IState[keyof IState]): void {
        this.data.set(name, value);
    }

    getData(name: keyof IState): any | undefined {
        return this.data.get(name);
    }

    publish(name: string, ...args: any[]): void {
        this.subscribers.get(name)?.forEach(fn => fn(...args));
    }

    subscribe(name: string, fn: (...args: any[]) => void): void {
        this.subscribers.has(name)
            ? this.subscribers.get(name)!.push(fn)
            : this.subscribers.set(name, [fn]);
    }

    unsubscribe(name: string, fn: (...args: any[]) => void): void {
        if (this.subscribers.has(name)) {
            const idx = this.subscribers.get(name)!.indexOf(fn);
            if (idx > -1) this.subscribers.get(name)!.splice(idx, 1);
        }
    }
    
    unsubscribeAll(name: string): void {
        this.subscribers.delete(name);
    }
}
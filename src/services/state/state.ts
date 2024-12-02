export class State<IState = Record<string, unknown>> {
    private data: Map<keyof IState, IState[keyof IState]> = new Map();
    private subscribers: Map<string, ((...args: any[]) => void)[]> = new Map();

    /**
     * Sets the value associated with the given name in the state data.
     * @param name The name of the value to set in the state data.
     * @param value The value to set in the state data.
     */
    set(name: keyof IState, value: IState[keyof IState]): void {
        this.data.set(name, value);
    }

    /**
     * Retrieves the value associated with the given name in the state data.
     * Returns undefined if the given name does not exist in the state data.
     * @param name The name of the value to retrieve from the state data.
     */
    get(name: keyof IState): any | undefined {
        return this.data.get(name);
    }
    
    /**
     * Returns true if the given name exists in the state data, false otherwise.
     * @param name the name to check for
     */
    has(name: keyof IState): boolean {
        return this.data.has(name);
    }

    /**
     * Clears all stored state data.
     */
    clear(): void {
        this.data.clear();
    }

    /**
     * Publishes an event with the given name and arguments. All subscribers
     * for the given event name will be called with the given arguments.
     * @param name The name of the event to publish.
     * @param args The arguments to pass to all subscribers.
     */
    publish(name: string, ...args: any[]): void {
        this.subscribers.get(name)?.forEach(fn => fn(...args));
    }

    /**
     * Adds a subscriber function for the given event name.
     * @param name The name of the event to subscribe to.
     * @param fn The subscriber function to add.
     */
    subscribe(name: string, fn: (...args: any[]) => void): void {
        this.subscribers.has(name)
            ? this.subscribers.get(name)!.push(fn)
            : this.subscribers.set(name, [fn]);
    }


    /**
     * Removes the given subscriber function from the given event name.
     * @param name The name of the event to remove the subscriber from.
     * @param fn The subscriber function to remove.
     */
    unsubscribe(name: string, fn: (...args: any[]) => void): void {
        if (this.subscribers.has(name)) {
            const idx = this.subscribers.get(name)!.indexOf(fn);
            if (idx > -1) this.subscribers.get(name)!.splice(idx, 1);
        }
    }
    /**
     * Removes all subscribers for the given event name.
     * @param name The name of the event to remove all subscribers from.
     */
    unsubscribeAll(name: string): void {
        this.subscribers.delete(name);
    }
}
export class Storage<T = any> {
    constructor(private name: string) { }

    get item(): string {
        return localStorage.getItem(this.name) as string;
    }

    set item(item: T) {
        localStorage.setItem(this.name, JSON.stringify(item));
    }

    clear(): void {
        localStorage.removeItem(this.name);
    }
}
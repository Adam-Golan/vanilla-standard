export abstract class Basis<IConfig> extends HTMLElement {
    constructor(protected config: IConfig) {
        super();
        this.callInit();
    }
    
    private callInit(): void {
        Promise.resolve().then(() => this.init());
    }

    protected abstract init(): void;

    // Create element.
    protected cElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K] {
        return document.createElement(tag);
    }

    // Get element -> Id.
    protected idElem(id: string): HTMLElement | null {
        return this.querySelector(`#${id}`);
    }

    // Get element -> Name.
    protected nmElem(name: string): NodeListOf<HTMLElement> {
        return this.querySelectorAll(`[name="${name}"]`);
    }

    // Get element -> Local Class.
    protected clsElem(className: string): NodeListOf<HTMLElement> {
        return this.querySelectorAll(`.${className}`);
    }

    // Get element -> Local Tag.
    protected tagElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
        return this.getElementsByTagName(tag);
    }
}
export abstract class Base<IText> extends HTMLElement {
    texts: IText;
    constructor() {
        super();
        // Throwing init method onto the queue stack, making sure everything is loaded properly.
        setTimeout(this.init.bind(this));
    }

    protected abstract init(): void;

    // Create element.
    protected cElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K] {
        return document.createElement(tag);
    }

    // Get element -> Id.
    protected giElem(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    // Get element -> Name.
    protected gnElem(name: string): NodeListOf<HTMLElement> {
        return document.getElementsByName(name);
    }

    // Get element -> Local Class.
    protected gcElem(className: string): HTMLCollectionOf<Element> {
        return this.getElementsByClassName(className);
    }

    // Get element -> Local Tag.
    protected gtElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
        return this.getElementsByTagName(tag);
    }
}

export abstract class SubPageBase<IText> extends Base<IText> {
    constructor() {
        super();
        // Create class for modules and components by constructor name.
        this.classList.add(this.constructor.name.toLowerCase());
    }
}
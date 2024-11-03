abstract class Basis extends HTMLElement {

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
    protected clsElem(className: string): HTMLCollectionOf<Element> {
        return this.getElementsByClassName(className);
    }

    // Get element -> Local Tag.
    protected tagElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
        return this.getElementsByTagName(tag);
    }
}

// Text oriented blocks.
export abstract class TextBase<IText> extends Basis {
    constructor(protected texts: IText) {
        super();
        this.init();
    }
}

// Data oriented blocks.
export abstract class DataSubPage<Idata> extends Basis {
    constructor(protected data: Idata) {
        super();
        setTimeout(this.init.bind(this));
    }
}
export abstract class Basis<IConfig> extends HTMLElement {

    /**
     * Construct a new `Basis` instance.
     *
     * @param config The configuration object for this component.
     *
     * The `init` method is called automatically after a short delay to allow the
     * component to be fully initialized before the `init` method is called.
     */
    constructor(protected config: IConfig) {
        super();
        setTimeout(this.init.bind(this));
    }

    protected abstract init(): void;

    /**
     * Create an element with a given tag name.
     * @param tag The tag name of the element to create, e.g. "div", "span", etc.
     * @returns The created element.
     */
    protected cElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K] {
        return document.createElement<K>(tag);
    }

    /**
     * Get an element by its id.
     * @param id The id of the element to retrieve.
     * @returns The element with the given id, or null if it doesn't exist.
     */
    protected idElem<K extends keyof HTMLElementTagNameMap>(id: K): HTMLElementTagNameMap[K] | null {
        return this.querySelector(`#${id}`);
    }

    /**
     * Get elements by their "name" attribute.
     * @param name The value of the "name" attribute to search for.
     * @returns A list of elements with a "name" attribute equal to the given value.
     */
    protected nmElem<K extends string>(name: K): NodeListOf<HTMLInputElement> {
        return this.querySelectorAll(`[name="${name}"]`);
    }

    /**
     * Get elements by their "class" attribute.
     * @param className The value of the "class" attribute to search for.
     * @returns A list of elements with a "class" attribute equal to the given value.
     */
    protected clsElem<K extends string>(className: K): NodeListOf<HTMLElement & { className: K }> {
        return this.querySelectorAll(`.${className}`);
    }

    /**
     * Get elements by their tag name.
     * @param tag The tag name of the elements to retrieve, e.g. "div", "span", etc.
     * @returns A collection of elements with the specified tag name.
     */
    protected tagElem<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
        return this.getElementsByTagName<K>(tag);
    }


    /**
     * Create a container element with specified classes, tag, and attributes.
     * 
     * @param cls - A string or array of strings representing the class names to add to the element.
     * @param tag - The tag name of the element to create (default is 'div').
     * @param attrs - An object representing custom attributes to set on the element.
     * @returns The created HTML element with the specified configuration.
     */
    protected createContainer(cls: string | string[], tag: keyof HTMLElementTagNameMap = 'div', attrs: Record<string, string> = {}): HTMLElement {
        const container = this.cElem(tag);
        container.classList.add('container', ...Array.isArray(cls) ? cls : [cls]);
        for (const [key, value] of Object.entries(attrs)) container.setAttribute(key, value);
        return container;
    }
}

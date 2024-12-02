import { BlockType } from "../types";

/**
 * Enlists a custom element into Custom Elements Registry.
 *
 * @param type - a type of custom element (page, module, component)
 * @param target - a custom element constructor
 */
export function Enlist(type: BlockType, target: CustomElementConstructor) {
    customElements.define(`${target.name.toLowerCase()}-${type}`, target);
}

/**
 * Adds meta information to a custom element.
 *
 * @param target - a custom element
 * @param type - a type of custom element (page, module, component)
 */

export function addMeta(target: HTMLElement, type: BlockType) {
    const name = target.constructor.name.toLowerCase();
    // Create id for pages or class for modules and components by constructor name.
    target[type === 'page' ? 'id' : 'className'] = name;
    // Setting data-type.
    target.dataset.type = type;
}

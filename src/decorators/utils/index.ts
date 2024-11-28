import { ElementType } from "../types/types";

export function Enlist(type: ElementType, target: CustomElementConstructor) {
    customElements.define(`${target.name.toLowerCase()}-${type}`, target);
}

export function addMeta(target: HTMLElement, cls: 'page' | 'module' | 'component') {
    const name = target.constructor.name.toLowerCase();
    // Create id for pages or class for modules and components by constructor name.
    target[cls === 'page' ? 'id' : 'className'] = name;
    // Setting data-type.
    target.dataset.type = cls;
}
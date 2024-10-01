import { ElementType } from "../types/types";

export function Enlist(type: ElementType, target: CustomElementConstructor) {
    customElements.define(`${target.name.toLowerCase()}-${type}`, target);
}
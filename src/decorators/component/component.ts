import { Enlist } from "@decorators/utils/listing";
import { SubPageBase } from "../base";

// Enlisting component into custom elements registry.
export function ComponentDecorator(target: CustomElementConstructor) {
    Enlist('component', target);
}

export abstract class ComponentBase<IText = any> extends SubPageBase<IText> {
    constructor() {
        super();
        // Setting data-type as component.
        this.dataset.type = 'component';
    }
}
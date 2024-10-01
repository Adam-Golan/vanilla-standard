import { SubPageBase } from "@decorators/base";
import { Enlist } from "@decorators/utils/listing";
import { State } from "@services";

// Enlisting module into custom elements registry.
export function ModuleDecorator(target: CustomElementConstructor) {
    Enlist('module', target);
}

export abstract class ModuleBase<IText = any> extends SubPageBase<IText> {
    // Creating a module's state.
    moduleState = new State();

    constructor() {
        super();
        // Setting data-type as module.
        this.dataset.type = 'module';
    }
}
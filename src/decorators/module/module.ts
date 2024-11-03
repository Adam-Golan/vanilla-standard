import { TextBase, DataSubPage } from "@decorators/base";
import { Enlist } from "@decorators/utils/listing";
import { State } from "@services";
import { addMeta } from "@decorators/utils/adders";


// Enlisting module into custom elements registry.
export function ModuleDecorator(target: CustomElementConstructor) {
    Enlist('module', target);
}

export abstract class ModuleText<IText = Record<string, string | Record<string, string>>> extends TextBase<IText> {
    // Creating a module's state.
    moduleState = new State();

    constructor(protected texts: IText) {
        super(texts);
        addMeta(this, 'module');
    }
}

export abstract class ModuleData<IData = Record<string, any | Record<string, any>>> extends DataSubPage<IData> {
    // Creating a module's state.
    moduleState = new State();

    constructor(protected data: IData) {
        super(data);
        addMeta(this, 'module');
    }
}
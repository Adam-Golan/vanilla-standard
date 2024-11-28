import { Basis } from "@decorators/base";
import { Enlist, addMeta } from "@decorators/utils";
import { State } from "@services";


// Enlisting module into custom elements registry.
export function ModuleDecorator(target: CustomElementConstructor) {
    Enlist('module', target);
}

export abstract class Module<IConfig = Record<string, any>> extends Basis<IConfig> {
    state = new State();

    constructor(protected config: IConfig, protected pageState?: State) {
        super(config);
        addMeta(this, 'module');
    }
}
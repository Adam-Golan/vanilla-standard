import { Basis } from "@decorators/base";
import { Enlist, addMeta } from "@decorators/utils";
import { State } from "@services";


/**
 * Enlists a custom element into Custom Elements Registry as a module.
 *
 * @param target - a custom element constructor
 */
export function ModuleDecorator<T extends CustomElementConstructor>(target: T): void {
    Enlist('module', target);
}

export abstract class Module<IConfig = Record<string, any>> extends Basis<IConfig> {
    state = new State();

    /**
     * Constructs a Module instance.
     *
     * @param config - Configuration object of type IConfig.
     * @param parentState - Optional parent state.
     */
    constructor(protected config: IConfig, protected parentState?: State) {
        super(config);
        addMeta(this, 'module');
    }
}
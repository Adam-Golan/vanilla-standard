import { Enlist, addMeta } from "@decorators/utils";
import { Basis } from "../base";
import { State } from "@services";

/**
 * Enlists a component into custom elements registry.
 *
 * @param target - A constructor function for a custom element.
 * @returns The same constructor function, but with the component enlisting decorator.
 */
export function ComponentDecorator<T extends CustomElementConstructor>(target: T): void {
    Enlist('component', target);
}

export abstract class Component<IConfig = Record<string, any>> extends Basis<IConfig> {
    /**
     * Constructs a Component instance.
     *
     * @param config - Configuration object of type IConfig.
     * @param parentState - Optional parent state.
     */
    constructor(protected config: IConfig, protected parentState?: State) {
        super(config);
        addMeta(this, 'component');
    }
}

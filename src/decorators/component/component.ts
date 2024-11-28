import { Enlist, addMeta } from "@decorators/utils";
import { Basis } from "../base";
import { State } from "@services";

// Enlisting component into custom elements registry.
export function ComponentDecorator(target: CustomElementConstructor) {
    Enlist('component', target);
}

export abstract class Component<IConfig = Record<string, any>> extends Basis<IConfig> {
    constructor(protected config: IConfig, protected moduleState?: State) {
        super(config);
        addMeta(this, 'component');
    }
}
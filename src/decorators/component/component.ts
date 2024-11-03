import { Enlist } from "@decorators/utils/listing";
import { TextBase, DataSubPage } from "../base";
import { addMeta } from "@decorators/utils/adders";

// Enlisting component into custom elements registry.
export function ComponentDecorator(target: CustomElementConstructor) {
    Enlist('component', target);
}

export abstract class ComponentText<IText = Record<string, string>> extends TextBase<IText> {
    constructor(protected texts: IText) {
        super(texts);
        addMeta(this, 'component');
    }
}

export abstract class ComponentData<IData = Record<string, any>> extends DataSubPage<IData> {
    constructor(protected data: IData) {
        super(data);
        addMeta(this, 'component');
    }
}
import { ComponentText, ComponentDecorator } from "@decorators";
import { ISoonText } from "./lang";

import './soon.scss';

@ComponentDecorator
export class Soon extends ComponentText<ISoonText['pageName']> {

    constructor(protected texts: ISoonText['pageName']) {
        super(texts);
    }

    protected init(): void {
        const header = this.cElem('h1');
        header.innerText = `${this.texts} is coming soon...`;
        this.append(header);
    }
}
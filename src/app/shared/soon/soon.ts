import { ComponentBase, ComponentDecorator } from "@decorators";

import './soon.scss';

@ComponentDecorator
export class Soon extends ComponentBase {

    constructor(private pageName: string) {
        super();
    }

    protected init(): void {
        const header = this.cElem('h1');
        header.innerText = `${this.pageName} is coming soon...`;
        this.append(header);
    }
}
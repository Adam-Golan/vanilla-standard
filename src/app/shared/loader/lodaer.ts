import { ComponentBase, ComponentDecorator } from "@decorators";

import './loader.scss';

@ComponentDecorator
export class Loader extends ComponentBase<null> {
    protected init(): void {
        const img = this.cElem('img');
        img.style.background = `url(/loader/loader.svg) no-repeat 50%`;
        this.append(img);
    }
}
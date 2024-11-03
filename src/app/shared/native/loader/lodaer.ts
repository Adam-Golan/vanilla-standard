import { ComponentDecorator } from '@decorators';
import './loader.scss';
import { addMeta } from '@decorators/utils/adders';

@ComponentDecorator
export class Loader extends HTMLElement {
    
    constructor() {
        super();
        addMeta(this, 'component');
    }

    protected init(): void {
        const img = document.createElement('img');
        img.style.background = `url(/loader/loader.svg) no-repeat 50%`;
        this.append(img);
    }
}
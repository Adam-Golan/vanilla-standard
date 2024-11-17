import { ComponentDecorator } from "@decorators";

import './avatar.scss';
import { addMeta } from "@decorators/utils/adders";

@ComponentDecorator
export class Avatar extends HTMLElement {

    constructor(url: string, width: number = 100) {
        super();
        addMeta(this, 'component');
        this.setAttribute('role', 'img');
        this.setAttribute('alt', 'avatar');
        this.style.width = `${width}px`;
        this.style.backgroundImage = `url('${url}'), url('/user.svg')`;
    }
}

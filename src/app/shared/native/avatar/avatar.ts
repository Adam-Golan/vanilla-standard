import { ComponentDecorator } from "@decorators";

import './avatar.scss';

@ComponentDecorator
export class Avatar extends HTMLElement {

    constructor(url: string, width: number = 100) {
        super();
        this.setAttribute('role', 'img');
        this.setAttribute('alt', 'avatar');
        this.style.width = `${width}px`;
        this.style.backgroundImage = `url('${url}'), url('/user.svg')`;
    }
}

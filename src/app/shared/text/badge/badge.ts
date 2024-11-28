import { ComponentDecorator, Component } from "@decorators";
import { IBadgeConfig } from "./lang";

import './badge.scss';

@ComponentDecorator
export class Badge extends Component<IBadgeConfig> {
    
    constructor(protected texts: IBadgeConfig) {
        super(texts);
    }
    
    protected init(): void {
        this.classList.add(this.texts.type, this.texts.pos);
        this.innerHTML = this.texts.text;
    }
}

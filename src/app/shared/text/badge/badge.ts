import { ComponentDecorator, ComponentText } from "@decorators";
import { IBadgeConfig } from "./lang";

import './badge.scss';

@ComponentDecorator
export class BadgeTag extends ComponentText<IBadgeConfig> {
    
    constructor(protected texts: IBadgeConfig) {
        super(texts);
    }
    
    protected init(): void {
        this.classList.add(this.texts.type, this.texts.pos);
        this.innerHTML = this.texts.text;
    }
}

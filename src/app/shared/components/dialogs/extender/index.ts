import { Component, ComponentDecorator } from "@decorators";
import { MenuDropdown } from "../dropdown";
import { ExtenderType } from "./types";

import './extender.scss';

@ComponentDecorator
export class Extender<T extends HTMLElement> extends Component<T[]> {
    dropdown: MenuDropdown<T>;

    constructor(protected list: T[], protected type: ExtenderType) {
        super(list);
        this.classList.add('extender');
        if(this.type.match(/(caret|dots)/))this.classList.add(...this.type.split(' '));
        this.onclick = () => this.dropdown.toggle();
    }
    
    protected init(): void {
        this.dropdown = new MenuDropdown<T>(this.list);
        if (!this.type.match(/(caret|dots)/)) {
            const div = this.cElem('div');
            div.innerHTML = this.type;
            div.className = 'link';
            this.append(div);
        }
        this.append(this.dropdown);
    }
}
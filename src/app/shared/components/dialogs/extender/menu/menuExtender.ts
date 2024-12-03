import { ComponentDecorator } from "@decorators";
import { BaseExtender } from "../base";
import { MenuDropdown } from "../../dropdown";

@ComponentDecorator
export class MenuExtender<T extends HTMLElement> extends BaseExtender<T> {

    constructor(protected list: T[], protected type: 'dots' | 'caret' | string) {
        super(list, type);
    }
    protected init(): void {
        this.dropdown = new MenuDropdown<T>(this.list);
        if (this.type !== 'caret' && this.type !== 'dots') {
            const div = this.cElem('div');
            div.innerHTML = this.type;
            div.className = 'link';
            this.append(div);
        }
        this.append(this.dropdown);
        super.init();
    }
}
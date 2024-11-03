import { ComponentDecorator } from "@decorators";
import { BaseExtender } from "../base";
import { MenuDropdown } from "../../dropdown";

@ComponentDecorator
export class MenuExtender<T extends HTMLElement> extends BaseExtender<T> {

    constructor(protected list: T[], protected type: 'dots' | 'caret') {
        super(list, type);
    }
    protected init(): void {
        this.dropdown = new MenuDropdown<T>(this.list);
        this.append(this.dropdown);
        super.init();
    }
}
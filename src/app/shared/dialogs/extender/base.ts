import { ComponentBase } from "@decorators";
import { BaseDropdown } from "../dropdown/base";

import './extender.scss';

export abstract class BaseExtender<T> extends ComponentBase {
    dropdown: BaseDropdown<T>;
    constructor(protected type: 'dots' | 'caret', protected list: T[]) {
        super();
        this.classList.add('extender' ,this.type);
    }

    protected init(): void {
        this.onclick = () => this.dropdown.toggle();
    }
}
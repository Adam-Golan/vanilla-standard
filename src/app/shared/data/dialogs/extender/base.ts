import { ComponentData } from "@decorators";
import { BaseDropdown } from "../dropdown/base";

import './extender.scss';

export abstract class BaseExtender<T> extends ComponentData<T[]> {
    dropdown: BaseDropdown<T>;
    constructor(protected list: T[], protected type: 'dots' | 'caret') {
        super(list);
        this.classList.add('extender', this.type);
    }

    protected init(): void {
        this.onclick = () => this.dropdown.toggle();
    }
}
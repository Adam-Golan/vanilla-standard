import { ComponentDecorator } from "@decorators";

import './progress.scss';
import { addMeta } from "@decorators/utils/adders";

@ComponentDecorator
export class Progress extends HTMLElement {
    progress: HTMLProgressElement;
    constructor(public max: number) {
        super();
        addMeta(this, 'component');
        this.append(this.progress = document.createElement('progress'));
        this.progress.max = max;
    }

    update(value: number): void {
        this.progress.value = value;
    }
}
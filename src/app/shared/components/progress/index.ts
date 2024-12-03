import { Component, ComponentDecorator } from "@decorators";

import './progress.scss';

@ComponentDecorator
export class Progress extends Component<number> {
    progress = this.appendChild(this.cElem('progress'));
    constructor(protected max: number) {
        super(max);
        this.progress.max = this.max;
    }

    protected init(): void {}

    update(value: number): void {
        if (this.progress.value !== value) {
            this.progress.value = value;
        }
    }
}


import { ComponentDecorator } from "@decorators";
import { addMeta } from "@decorators/utils";
import { State } from "@services";
import { StateKeys } from "@constants/stateKeys.constant";

import './adder.scss';

@ComponentDecorator
export class Adder extends HTMLElement {
    constructor(protected appState: State, private comp: HTMLElement) {
        super();
        this.init();
        addMeta(this, 'component');
    }
    protected init(): void {
        this.id = 'adder';
        this.onclick = () => this.appState.publish(StateKeys.openModal, this.comp);
    }
}
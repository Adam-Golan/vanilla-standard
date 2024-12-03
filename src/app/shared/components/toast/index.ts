import { ComponentDecorator } from "@decorators";

import './toast.scss';

@ComponentDecorator
export class Toast extends HTMLElement {
    constructor(listener: Function, event: keyof HTMLElementEventMap, msg: string, ref: HTMLElement, type: 'success' | 'error' | 'info' | 'warn' | 'general' = 'general', private timeout = 5000) {
        super();
        listener(event, this.showToast.bind(this));
        this.innerHTML = msg;
        this.className = `toast ${type} ${ref === document.body ? 'body' : 'el'}`;
        ref.append(this);
    }

    private showToast(): void {
        setTimeout(() => this.classList.add('show'));
        setTimeout(() => this.classList.remove('show'), this.timeout);
    }
}

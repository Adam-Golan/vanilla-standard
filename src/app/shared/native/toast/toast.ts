import { ComponentDecorator } from "@decorators";

import './toast.scss';

@ComponentDecorator
export class ToastNotification extends HTMLElement {

    showToast(message: string, ref: HTMLElement, type: 'success' | 'error' | 'info' | 'warn' | 'general' = 'general', autoClose = 5000): void {
        this.innerHTML = message;
        this.className = `toast ${type}`;
        ref.append(this);
        setTimeout(() => this.classList.add('show'));
        setTimeout(() => {
            this.classList.remove('show');
            setTimeout(() => ref.removeChild(this), 500);
        }, autoClose);
    }
}

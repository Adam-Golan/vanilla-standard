import { ComponentDecorator, ComponentText } from "@decorators";
import { ITooltipConfig, ITooltipText } from "./lang";

import './tooltip.scss';

abstract class Tooltip<T extends ITooltipText> extends ComponentText<T> {
    constructor(protected texts: T) {
        super(texts);
        this.classList.add('tooltip');
    }

    protected addTooltipListeners(ref: HTMLElement): void {
        ref.addEventListener("mouseenter", () => this.toggleTooltip(true));
        ref.addEventListener("mouseleave", () => this.toggleTooltip(false));
    }

    private toggleTooltip(show: boolean): void {
        this.classList[show ? 'add' : 'remove']('show');
    }

    protected abstract createTooltip(): void
}

// Tooltip as Element.
@ComponentDecorator
export class TooltipEl extends Tooltip<ITooltipConfig> {

    protected init(): void {
        this.setAttribute("role", "tooltip");
        this.addTooltipListeners(this);
        if (!this.texts.label && !this.texts.symbol) throw 'Cannot render tooltip element without label or symbol!';
        if (this.texts.symbol) this.createSymbol();
        if (this.texts.label) this.createLabel();
        this.createTooltip();
    }

    private createSymbol(): void {
        const cls = ['i', '?'].includes(this.texts.type) ? 'info' : 'danger';
        const span = this.createSpan(`symbol ${cls}`);
        span.dataset.symbol = this.texts.type;
        this.append(span);
    }

    private createLabel(): void {
        this.append(this.createSpan('content', `${this.texts.label}`));
    }

    protected createTooltip(): void {
        const cls = ['i', '?'].includes(this.texts.type) ? 'info' : 'danger';
        this.append(this.createSpan(`bubble ${cls}`, this.texts.text));
    }

    private createSpan(cls: string, content?: string): HTMLSpanElement {
        const span = this.cElem('span');
        span.className = cls;
        if (content) span.innerHTML = content;
        return span;
    }
}

// Appendable Tooltip.
@ComponentDecorator
export class TooltipAp extends Tooltip<ITooltipText> {

    constructor(protected texts: ITooltipText, private ref: HTMLElement) {
        super(texts);
    }

    protected init(): void {
        this.setAttribute("role", "tooltip");
        this.addTooltipListeners(this.ref);
        this.createTooltip();
    }

    protected createTooltip(): void {
        this.innerHTML = this.texts.text;
        const cls = ['i', '?'].includes(this.texts.type) ? 'info' : 'danger';
        this.className = `bubble ${cls}`;
    }
}

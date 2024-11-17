import { ComponentDecorator, ComponentText } from "@decorators";
import { ICollapsible } from "./lang";

import './collapsible.scss';

@ComponentDecorator
export class Collapsible extends ComponentText<ICollapsible> {
    protected init(): void {
        if (this.texts.type) this.classList.add(this.texts.type);
        const details = this.cElem('details');
        const summary = this.cElem('summary');
        const content = this.cElem('div');
        summary.innerHTML = `<span>&#9658;</span> ${this.texts.summary}`;
        content.innerHTML = this.texts.content;
        content.className = 'content';
        details.append(summary);
        this.append(details, content);
    }
}
import { ComponentDecorator, Component } from "@decorators";
import { ICollapsible } from "./lang";

import './collapsible.scss';

@ComponentDecorator
export class Collapsible extends Component<ICollapsible> {
    protected init(): void {
        if (this.config.type) this.classList.add(this.config.type);
        const details = this.cElem('details');
        const summary = this.cElem('summary');
        const content = this.cElem('div');
        summary.innerHTML = `<span>&#9658;</span> ${this.config.summary}`;
        content.innerHTML = this.config.content;
        content.className = 'content';
        details.append(summary);
        this.append(details, content);
    }
}
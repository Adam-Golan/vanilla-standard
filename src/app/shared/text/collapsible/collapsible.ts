import { ComponentDecorator, ComponentText } from "@decorators";
import { ICollapsible } from "./lang";

@ComponentDecorator
export class Collapsible extends ComponentText<ICollapsible> {
    protected init(): void {
        const collapser = this.cElem('button');
        const title = this.cElem('span');
        const icon = this.cElem('span');
        const content = this.cElem('div');
        collapser.className = title.className = icon.className = content.className = 'collapsible-';
        collapser.className += 'header';
        title.className += 'title';
        icon.className += 'icon';
        content.className += 'content';
        title.innerHTML = this.texts.summary;
        icon.innerText = '&#9660;';
        content.innerHTML = `<p>${this.texts.content}</p>`;
        collapser.onclick = () => this.classList.toggle('extand');
        collapser.append(title, icon);
        this.append(collapser, content);
    }
}
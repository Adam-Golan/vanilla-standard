import { ComponentBase, ComponentDecorator } from "@decorators";
import { IHeroText } from "./lang";
import { State } from "@services";
import { StateKeys } from "@services/state/config";
import { Link } from "@app/shared";

import './hero.scss';

@ComponentDecorator
export class Hero extends ComponentBase<IHeroText> {

    constructor(private pageState: State) {
        super();
    }

    protected init(): void {
        this.append(this.createContent());
    }

    private createContent(): HTMLElement {
        const content = this.cElem('div');
        const header = this.cElem('h1');
        const subHeader = this.cElem('p');
        this.style.backgroundImage = `url(${this.texts.img})`;
        header.innerText = this.texts.header;
        subHeader.innerText = this.texts.subHeader;
        content.append(header, subHeader);
        if (this.texts.anchor?.text) {
            const link = new Link(() => this.pageState.publish(StateKeys.stateNavigate, this.texts.anchor?.href));
            link.texts = this.texts.anchor;
            content.append(link);
        }
        return content;
    }

}
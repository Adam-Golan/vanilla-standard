import { ComponentText, ComponentDecorator } from "@decorators";
import { IHeroText } from "./lang";
import { State } from "@services";
import { StateKeys } from "@constants/stateKeys.constant";
import { Link } from "@app/shared";

import './hero.scss';

@ComponentDecorator
export class Hero extends ComponentText<IHeroText> {

    constructor(protected texts: IHeroText, private pageState: State) {
        super(texts);
    }

    protected init(): void {
        this.append(this.createContent());
    }

    private createContent(): HTMLElement {
        const content = this.cElem('header');
        const header = this.cElem('h1');
        const subHeader = this.cElem('h3');
        this.style.backgroundImage = `url(${this.texts.img})`;
        header.innerText = this.texts.header;
        subHeader.innerText = this.texts.subHeader;
        content.append(header, subHeader);
        if (this.texts.anchor?.text && this.texts.anchor?.href)
            content.append(new Link(this.texts.anchor, () => this.pageState.publish(StateKeys.stateNavigate, this.texts.anchor?.href)));
        return content;
    }

}
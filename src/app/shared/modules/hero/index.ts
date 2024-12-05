import { Module, ModuleDecorator } from "@decorators";
import { IHeroText } from "./lang";
import { State } from "@services";
import { StateKeys } from "@constants/stateKeys.constant";
import { Link } from "@app/shared";
import { Header } from './components';

import './hero.scss';

@ModuleDecorator
export class Hero extends Module<IHeroText> {

    constructor(protected texts: IHeroText, protected pageState: State) {
        super(texts);
    }

    protected init(): void {
        this.style.backgroundImage = `url(${this.texts.img})`;
        this.append(new Header(this.texts));
        if (this.texts.anchor?.text && this.texts.anchor?.href)
            this.append(new Link(this.texts.anchor, () => this.pageState.publish(`/:${StateKeys.navigate}`, this.texts.anchor?.href)));
    }
}
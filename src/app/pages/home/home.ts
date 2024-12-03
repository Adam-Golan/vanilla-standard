import { Page, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Hero } from "@app/shared";

import './home.scss';

@PageDecorator
export class Home extends Page<typeof texts.home> {
    protected init() {
        this.append(new Hero(this.texts.HERO, this.appState));
        super.init();
        this.showPage();
    }
}
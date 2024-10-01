import { PageBase, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Hero } from "@app/shared";

import './home.scss';

@PageDecorator
export class Home extends PageBase<typeof texts.home> {
    hero: Hero;
    protected async init() {
        this.subPageList = ['hero'];
        this.hero = new Hero(this.pageState);
        this.append(this.hero);
        super.init();
        this.showPage();
    }
}
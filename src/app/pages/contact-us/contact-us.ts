import { PageBase, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Hero } from "@app/shared";

@PageDecorator
export class Contact extends PageBase<typeof texts.contact> {
    hero: Hero;
    protected async init() {
        this.subPageList = ['hero'];
        this.hero = new Hero(this.pageState);
        this.append(this.hero);
        super.init();
        this.showPage();
    }
}
import { Page, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Hero } from "@app/shared";

@PageDecorator
export class Contact extends Page<typeof texts.contact> {
    protected async init() {
        this.append(new Hero(this.texts.HERO, this.pageState));
        super.init();
        this.showPage();
    }
}
import { Page, PageDecorator } from "@decorators";
import type{ texts } from "@i18n/en/lang";
import { Soon } from "@app/shared";

@PageDecorator
export class AboutUs extends Page<typeof texts.aboutus> {
    protected async init() {
        this.append(new Soon(this.texts.SOON.pageName));
        super.init();
        this.showPage();
    }
}
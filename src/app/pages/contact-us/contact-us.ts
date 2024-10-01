import { PageBase, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Soon } from "@app/shared";

@PageDecorator
export class Contact extends PageBase<typeof texts.contact> {
    protected async init() {
        this.append(new Soon(this.texts.SOON.pageName));
        super.init();
        this.showPage();
    }
}
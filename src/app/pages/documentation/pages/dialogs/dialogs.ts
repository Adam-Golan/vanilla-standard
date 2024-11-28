import { Page, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Soon } from "@app/shared";

@PageDecorator
export class Dialogs extends Page<typeof texts.dialogs> {
    protected async init() {
        this.append(new Soon(this.texts.SOON.pageName));
        super.init();
        this.showPage();
    }
}
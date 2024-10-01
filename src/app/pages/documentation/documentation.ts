import { PageBase, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Soon } from "@app/shared";

@PageDecorator
export class Documentation extends PageBase<typeof texts.documentation> {
    protected async init() {
        this.append(new Soon(this.texts.SOON.pageName));
        super.init();
        this.showPage();
    }
}
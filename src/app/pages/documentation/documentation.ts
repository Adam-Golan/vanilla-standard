import { Page, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Navbar } from "@app/shared";
import { Navigation } from "@services";
import { config } from "./pages";

@PageDecorator
export class Documentation extends Page<typeof texts.docs> {
    navigation: Navigation;
    protected override init() {
        const content = this.cElem('div');
        this.navigation = new Navigation(this.state, content, config, 'forms', 'docs');
        this.navigation.setTexts(this.texts);
        const nav = new Navbar(this.navigation.pages, this.state);
        this.append(nav, content);
        super.init();
        this.showPage();
    }
}
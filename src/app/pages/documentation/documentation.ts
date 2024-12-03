import { Page, PageDecorator } from "@decorators";
import type { texts } from "@i18n/en/lang";
import { Navbar, Top } from "@app/shared";
import { Navigation } from "@services";
import { config } from "./pages";

@PageDecorator
export class Documentation extends Page<typeof texts.docs> {
    protected override init() {
        const content = this.cElem('div');
        this.navigation = new Navigation(this.state, content, config, 'forms', 'docs');
        this.navigation.setTexts(this.texts);
        const nav = new Navbar(this.navigation.tree.children, this.state);
        this.append(nav, content, new Top(this));
        super.init();
        this.showPage();
    }

    static getPages() { return config; }
}
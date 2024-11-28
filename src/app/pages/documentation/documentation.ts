import { Page, PageDecorator } from "@decorators";
import { texts } from "@i18n/en/lang";
import { Navbar } from "@app/shared";
import { Navigation } from "@services";
import { config } from "./pages";

@PageDecorator
export class Documentation extends Page<typeof texts.docs> {
    navigation: Navigation;
    protected override init() {
        // console.time('label');
        // console.timeLog('label');
        const content = this.cElem('div');
        // console.log(this.texts);
        // console.log(this.appState);
        setTimeout(() => {
            // console.log('after timeout',this.appState);
            // console.timeEnd('label');
            this.navigation = new Navigation(this.pageState, content, config, 'forms', 'docs');
            this.navigation.setTexts(this.texts);
            const nav = new Navbar(this.navigation.pages, this.pageState);
            this.append(nav, content);
            super.init();
            this.showPage();
        });
    }
}
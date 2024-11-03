import { Enlist } from "@decorators/utils/listing";
import { TextBase } from "@decorators/base";
import { addMeta } from "@decorators/utils/adders";
import { State } from "@services";
import { StateKeys } from "@constants/stateKeys.constant";
import { LayoutType } from "@decorators/types/types";
import { Footer } from "@app/shared";
import { BasePageText } from "@i18n/interfaces";

export function PageDecorator(target: CustomElementConstructor) {
    Enlist('page', target);
}

export abstract class Page<IText extends BasePageText = any> extends TextBase<IText> {
    // Creating a page's state.
    pageState = new State();
    // Creating a footer.
    footer: Footer;
    // Declatring layout type.
    layout: LayoutType = 'single_column';

    constructor(protected texts: IText, protected appState: State) {
        super(texts);
        addMeta(this, 'page');
        // Setting data-layout.
        this.dataset.layout = this.layout;
    }

    // Useful with super.init().
    protected init(): void {
        // Creating footer.
        this.createFooter();
        // Erase if upsetting.
        if (import.meta.env.DEV) console.log('Don\'t forget to use showPage function, or you\'ll be stuck with the loader element.');
    }

    private createFooter(): void {
        // this.footer = new Footer(this.appState);
        // this.footer.texts = this.texts.FOOTER;
        // this.append(this.footer);
    }

    // End loader utility.
    protected showPage(seconds = 0): void {
        setTimeout(() => this.appState.publish(StateKeys.pageContentLoaded), seconds);
    }
}
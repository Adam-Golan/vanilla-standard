import { Basis } from "@decorators/base";
import { Enlist, addMeta } from "@decorators/utils";
import { type Navigation, State } from "@services";
import { StateKeys } from "@constants/stateKeys.constant";
import { LayoutType } from "@decorators/types";
import { BasePageText } from "@i18n/interfaces";
import { IFooterConfig } from "@app/shared/modules/footer/types";

export function PageDecorator(target: CustomElementConstructor) {
    Enlist('page', target);
}

export abstract class Page<IText extends BasePageText = any> extends Basis<IText> {
    // Creating a page's state.
    state = new State();
    // Declaring layout type.
    layout: LayoutType = 'single_column';
    // Declaring optional navigation.
    navigation?: Navigation;

    constructor(protected texts: IText, protected appState: State) {
        super(texts);
        addMeta(this, 'page');
        // Setting data-layout.
        this.dataset.layout = this.layout;
    }

    // Useful with super.init().
    protected init(): void {
        // Erase if upsetting.
        if (import.meta.env.DEV) {
            console.log('Don\'t forget to use showPage function, or you\'ll be stuck with the loader element.');
            if (this.navigation) console.log(`${this.constructor.name}: Don\'t forget to create a static method getPages(): IPages`);
        }
    }

    // End loader utility.
    protected showPage(path = ''): void {
        setTimeout(() => this.appState.publish(`${path}:${StateKeys.contentReady}`));
    }
    
    protected updateFooter(newConfig: IFooterConfig): void {
        setTimeout(() => this.appState.publish(StateKeys.footerUpdate, newConfig));
    }
}
import { Basis } from "@decorators/base";
import { Enlist, addMeta } from "@decorators/utils";
import { type Navigation, State } from "@services";
import { StateKeys } from "@constants/stateKeys.constant";
import { LayoutType } from "@decorators/types";
import { BasePageText } from "@i18n/interfaces";
import { IFooterConfig } from "@app/shared/modules/footer/types";

/**
 * Enlists a custom element into the Custom Elements Registry as a page.
 *
 * @param target - A constructor function for a custom element.
 */
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

    /**
     * Constructor for Page.
     * @param texts Page's texts.
     * @param appState Application's state.
     */
    constructor(protected texts: IText, protected appState: State) {
        super(texts);
        addMeta(this, 'page');
        // Setting data-layout.
        this.dataset.layout = this.layout;
    }

    /**
     * Initializes the page.
     * Prints a message in the console if the page is not shown, and if the page has navigation, but the static method getPages() is not defined.
     * @remarks
     * This method is called automatically after the page is created.
     * If you don't want to see the message, you can delete this method or set the environment variable `DEV` to `false`.
     */
    protected init(): void {
        // Erase if upsetting.
        if (import.meta.env.DEV) {
            console.log('Don\'t forget to use showPage function, or you\'ll be stuck with the loader element.');
            if (this.navigation) console.log(`${this.constructor.name}: Don\'t forget to create a static method getPages(): IPages`);
        }
    }

    /**
     * Shows the page after the page's content is loaded.
     * @param path The path of the page to be shown, defaults to '/'.
     * @remarks
     * This method is not called automatically.
     * You need to show the page manually, by calling this method.
     */
    protected showPage(path = '/'): void {
        setTimeout(() => this.appState.publish(`${path}:${StateKeys.contentReady}`));
    }
    
    /**
     * Updates the footer configuration and re-renders its components.
     * Merges the existing configuration with the new configuration,
     * removes the existing DOM elements for updated sections,
     * and recreates those elements if a corresponding creation method exists.
     *
     * @param newConfig - The new footer configuration to be merged with the existing one.
     */
    protected updateFooter(newConfig: IFooterConfig): void {
        setTimeout(() => this.appState.publish(StateKeys.footerUpdate, newConfig));
    }
}
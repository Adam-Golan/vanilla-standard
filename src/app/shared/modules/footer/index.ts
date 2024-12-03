import { ModuleDecorator, Module } from "@decorators";
import type { State } from "@services";
import { IFooterConfig } from "./types";
import { Form } from "@app/shared/modules";
import { Link } from "../../components/link-based";
import { StateKeys } from "@constants/stateKeys.constant";

import './footer.scss';

@ModuleDecorator
export class Footer extends Module<IFooterConfig> {
    /**
     * Constructs a new Footer instance.
     *
     * @param config - The configuration object for the footer, containing details
     *                 about each section to be rendered.
     * @param appState - The application state object, used to manage and respond
     *                   to state changes related to the footer.
     * Subscribes to the footer update state key to trigger updates in the footer
     * whenever changes occur.
     */
    constructor(protected config: IFooterConfig, protected appState: State) {
        super(config, appState);
        this.appState.subscribe(StateKeys.footerUpdate, this.updateFooter.bind(this));
    }
    /**
     * Initializes the footer by creating its sections based on the configuration.
     * Checks for the presence of each section in the configuration and calls the
     * corresponding creation method if the section is defined.
     */
    protected init(): void {
        if (this.config.about) this.createAbout();
        if (this.config.links) this.createLinks();
        if (this.config.contact) this.createContact();
        if (this.config.socials) this.createSocials();
        if (this.config.copyrights) this.createCopyrights();
    }

    /**
     * Creates an about section in the footer.
     * It creates a 'div' element with the class 'about', and a 'h4' element with the text 'about us'.
     * Then it creates a new 'Link' component for each sector provided in the config's 'about' property,
     * and appends it to the 'about' container.
     * Finally it appends the 'about' container to the footer container.
     */
    private createAbout(): void {
        const about = this.cElem('div');
        about.className = 'about';
        const h4 = this.createSubHeader('about us');
        about.append(h4, ...Object.entries(this.config.about!).map(([sector, text]) => new Link({ text: text as string, href: `/about-us#${sector}` }, (path) => this.appState.publish(StateKeys.navigate, path))));
        this.append(about);
    }

    /**
     * Creates a links section in the footer.
     * It creates a 'div' element with the class 'links', and a 'h4' element with the text 'site links'.
     * Then it creates a new 'Link' component for each link provided in the config, and appends it to the 'links' container.
     * Finally it appends the 'links' container to the footer component.
     */
    private createLinks(): void {
        const links = this.createContainer('links');
        const h4 = this.createSubHeader('site links');
        links.append(h4, ...this.config.links!.map(link => new Link(link, (path) => this.appState.publish(StateKeys.navigate, path))));
        this.append(links);
    }

    /**
     * Creates a contact section in the footer.
     * - Initializes a container for the contact section.
     * - Adds a header with the text 'get in touch'.
     * - Appends a form using the configured map and buttons.
     * - Appends the contact section to the footer.
     */
    private createContact(): void {
        const contact = this.createContainer('contact');
        const h4 = this.createSubHeader('get in touch');
        contact.append(h4, new Form(this.config.contact!.map, this.config.contact!.btns));
        this.append(contact);
    }

    /**
     * Creates and appends a container for social media links to the footer.
     * The container is assigned the 'socials' class and its inner HTML is set
     * to display the social media links from the footer configuration.
     * Each link is represented by an anchor tag with an href attribute set
     * to the corresponding link, and an i tag with a class set to the
     * corresponding social media platform (e.g. 'fb', 'tw', 'ig', etc.).
     */
    private createSocials(): void {
        const socials = this.createContainer('socials');
        const h4 = this.createSubHeader('follow us');
        socials.append(h4, ...Object.entries(this.config.socials!).map(([social, link]) => `<a href="${link}"><i class="${social}"></i></a>`));
        this.append(socials);
    }

    /**
     * Creates and appends a container for copyright information to the footer.
     * The container is assigned the 'copyrights' class and its inner HTML is set
     * to display the copyright text from the footer configuration.
     */
    private createCopyrights(): void {
        const rights = this.createContainer('copyrights');
        rights.innerHTML = `&copy; ${this.config.copyrights}`;
        this.append(rights);
    }

    /**
     * Creates a subheader 'h4' element with the provided text and returns it.
     * @param text - The text to be displayed in the subheader.
     * @returns The created subheader element.
     */
    private createSubHeader(text: string): HTMLHeadingElement {
        const subHeader = this.cElem('h4');
        subHeader.innerText = text;
        return subHeader;
    }

    /**
     * Updates the footer configuration and re-renders its components.
     * Merges the existing configuration with the new configuration,
     * removes the existing DOM elements for updated sections,
     * and recreates those elements if a corresponding creation method exists.
     *
     * @param newConfig - The new footer configuration to be merged with the existing one.
     */
    private updateFooter(newConfig: IFooterConfig): void {
        this.config = { ...this.config, ...newConfig };
        for (const key of Object.keys(newConfig)) {
            this.clsElem(key)[0].remove();
            if (`create${key.capitalize()}` in this) (this as { [key: string]: any })[`create${key.capitalize()}`]();
        }
    }
}
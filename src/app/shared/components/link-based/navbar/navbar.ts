import { LinkBased } from "../link-based";
import { ComponentDecorator } from "@decorators";
import { StateKeys } from "@constants/stateKeys.constant";
import { Navigation } from "@services";
import { Link } from "@app/shared";
import { MenuExtender } from "@app/shared";

import './navbar.scss';

@ComponentDecorator
export class Navbar<IState = Record<string, any>> extends LinkBased<IState> {

/**
 * Initializes the navbar component by setting up navigation links, 
 * active state handling, and conditional elements based on screen width.
 * - Generates navigation links using `linkGenerator`.
 * - Sets the active link asynchronously after initialization.
 * - Creates a hamburger menu for screens with width <= 480px.
 * - Creates an extender menu for screens with width > 480px.
 * - Subscribes to navigation state changes to update active links.
 * - Listens to browser history changes to update active links.
 */
    protected init() {
        this.linkGenerator();
        Promise.resolve().then(() => this.setActive());
        // this.createLogo();
        // this.createLogin();
        if (window.screen.width <= 480) this.createHamburger();
        if (window.screen.width > 480) this.createExtender();
        this.state.subscribe(StateKeys.navigate, this.setActive.bind(this));
        window.addEventListener("popstate", _ => this.setActive());
    }
    
/**
 * Generates and appends a container element for navigation links.
 * Creates a 'div' element with the class 'links', populates it with
 * generated link elements, and appends it to the navbar component.
 */
    private linkGenerator(): void {
        const container = this.cElem('div');
        container.className = 'links';
        container.append(...this.createLinks());
        this.append(container);
    }

    /**
     * Creates a hamburger button that can be used to toggle the visibility
     * of the navigation bar links in small screens.
     * @returns {void}
     */
    private createHamburger(): void {
        const hamburger = this.cElem('div');
        hamburger.className = 'hamburger';
        for (const _ of new Array(3).fill(null)) hamburger.append(this.cElem('span'));
        /**
         * Toggles the classList of the hamburger button and the navbar container
         * between 'active' and 'show' on click.
         */
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            this.classList.toggle('show');
        }
        for (const link of Array.from(this.clsElem('link')))
            link.addEventListener('click', () => hamburger.click());
        this.prepend(hamburger);
    }

    /**
     * Creates a menu extender when the links in the navigation bar overflow.
     * This extender is a button that contains all the links that don't fit
     * in the navigation bar. The extender is shown when the navigation bar
     * is in the small screen.
     * @returns {void}
     */
    private createExtender() {
        const links = this.clsElem('links')[0];
        if (links.clientHeight > 50) {
            const linksCollect = this.clsElem('link');
            let linksWidth = 0;
            for (const link of Array.from(linksCollect)) linksWidth += +link.getBoundingClientRect().width.toFixed(2);
            const idx = Math.floor(window.screen.width / (linksWidth / linksCollect.length)) - 1;
            const toRemove = Array.from(links.children).splice(idx) as Link[];
            for (const link of toRemove) links.removeChild(link);
            this.clsElem('links')[0].append(new MenuExtender<Link>(toRemove, 'dots'));
        }
    }

/**
 * Updates the active state of links in the navigation bar.
 * Iterates over all link elements and compares their dataset href
 * with the current navigation path. Adds the 'active' class to the
 * matching link and removes it from others.
 */
    private setActive(): void {
        const links = Array.from(this.clsElem('link')) as Link[];
        for (const link of links) {
            link.dataset.href?.slice(1) === encodeURI(Navigation.lastCrumb())
                ? link.classList.add('active')
                : link.classList.remove('active');
        }
    }
}
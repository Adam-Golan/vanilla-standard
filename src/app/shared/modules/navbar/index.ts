import { ModuleDecorator, Module } from "@decorators";
import { Navigation, State } from "@services";
import { INavigationTree } from "@services/navigation/types";
import { StateKeys } from "@constants/stateKeys.constant";
import { Link } from "@app/shared";
import { ILink } from "@app/shared/components/link/types";
import { Extender } from "@app/shared";
import { ILinks, MenuItem } from "./types";

import './navbar.scss';

@ModuleDecorator
export class Navbar extends Module<INavigationTree['children']> {
    links: MenuItem[] = [];

    constructor(protected pages: INavigationTree['children'], protected parentState: State, type: 'top' | 'side' = 'top') {
        super(pages, parentState);
        this.classList.add(type);
    }

    protected init() {
        this.createLinks();
        this.linkGenerator();
        Promise.resolve().then(() => this.setActive());
        // this.createLogo();
        // this.createLogin();
        if (window.screen.width <= 480) this.createHamburger();
        if (window.screen.width > 480) this.createExtender();
        this.parentState.subscribe(`/${this.pages[0].path.split('/')[0]}:${StateKeys.navigate}`, this.setActive.bind(this));
        window.addEventListener("popstate", _ => this.setActive());
    }

    private createLinks(arrRef = this.links, pages = this.pages): void {
        for (const page of pages) {
            const text = page.label.addSpaces('uppercase').titleCase();
            if (page.children.length) {
                const subLink: MenuItem[] = [];
                this.createLinks(subLink, page.children);
                arrRef.push(new Extender<MenuItem>(subLink, text));
            } else arrRef.push(new Link({ href: page.path, text }, this.navigate.bind(this)));
        }
    }

    protected navigate(href: string): void {
        this.parentState.publish(`/${this.pages[0].path.split('/')[0]}:${StateKeys.navigate}`, href);
    }

    static isILink(item: ILink | { [key: string]: ILinks }): item is ILink {
        return typeof item === 'object' && 'text' in item && 'href' in item;
    }

    private linkGenerator(): void {
        const container = this.cElem('div');
        container.className = 'links';
        container.append(...this.links);
        this.append(container);
    }

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

    private createExtender() {
        const links = this.clsElem('links')[0];
        if (links.clientHeight > 50) {
            const linksCollect = this.clsElem('link');
            let linksWidth = 0;
            for (const link of Array.from(linksCollect)) linksWidth += +link.getBoundingClientRect().width.toFixed(2);
            const idx = Math.floor(window.screen.width / (linksWidth / linksCollect.length)) - 1;
            const toRemove = Array.from(links.children).splice(idx) as Link[];
            for (const link of toRemove) links.removeChild(link);
            this.clsElem('links')[0].append(new Extender<Link>(toRemove, 'dots'));
        }
    }

    private setActive(): void {
        const links = Array.from(this.clsElem('link'));
        for (const link of links)
            if (link instanceof Link) link.activateMe(`/${Navigation.lastCrumb()}`);
    }
}
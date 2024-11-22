import { LinkBased } from "../link-based";
import { ComponentDecorator } from "@decorators";
import { StateKeys } from "@constants/stateKeys.constant";
import { Link } from "@app/shared";
import { MenuExtender } from "@app/shared";

import './navbar.scss';

@ComponentDecorator
export class Navbar<IState = Record<string, any>> extends LinkBased<IState> {
    screenWidth = window.screen.width;

    protected init() {
        if (this.screenWidth <= 480) this.createHamburger();
        // this.createLogo();
        this.append(this.createLinks());
        // this.createLogin();
        if (this.screenWidth > 480) setTimeout(() => this.createExtender());
        // Setting active;
        setTimeout(() => this.setActive());
        this.appState.subscribe(StateKeys.navigate, this.setActive.bind(this));
        window.addEventListener("popstate", _ => this.setActive());
    }

    private createHamburger(): void {
        const hamburger = this.cElem('div');
        hamburger.className = 'hamburger';
        for (const _ of new Array(3).fill(null)) hamburger.append(this.cElem('span'));
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            this.classList.toggle('show');
        }
        setTimeout(() => {
            for (const link of Array.from(this.clsElem('link')))
                link.addEventListener('click', () => hamburger.click());
        });
        this.append(hamburger);
    }

    private createExtender() {
        const links = this.clsElem('links')[0];
        if (links.clientHeight > 50) {
            const linksCollect = this.clsElem('link');
            let linksWidth = 0;
            for (const link of Array.from(linksCollect)) linksWidth += +link.getBoundingClientRect().width.toFixed(2);
            const idx = Math.floor(this.screenWidth / (linksWidth / linksCollect.length)) - 1;
            const toRemove = Array.from(links.children).splice(idx) as Link[];
            for (const link of toRemove) links.removeChild(link);
            this.clsElem('links')[0].append(new MenuExtender<Link>(toRemove, 'dots'));
        }
    }

    // private createLogo(): void {
    //     const className = 'logo';
    //     const container = this.cElem('div');
    //     container.className = className;
    //     const anchor = this.cElem('a');
    //     anchor.className = `${className}-link`;
    //     anchor.href = '/';
    //     anchor.title = 'Home';
    //     anchor.onclick = (e) => {
    //         e.preventDefault();
    //         this.navigate(anchor.title);
    //     };
    //     container.append(anchor);
    //     this.append(container);
    // }

    // private createLogin(): void {
    //     const className = 'login';
    //     const container = this.cElem('div');
    //     container.className = className;
    //     const anchor = this.cElem('a');
    //     anchor.className = `${className}-button`;
    //     anchor.href = '/';
    //     anchor.innerText = 'Login';
    //     anchor.onclick = this.openLogin.bind(this);
    //     container.append(anchor);
    //     this.append(container);
    // }

    // private openLogin(e: MouseEvent): void {
    //     e.preventDefault();
    // }

    private setActive(): void {
        const path = location.pathname === '/' ? '/home' : location.pathname;
        const links = Array.from(this.clsElem('link'));
        for (const link of links) {
            (link as Link).dataset.href === encodeURI(path)
                ? link.classList.add('active')
                : link.classList.remove('active');
        }
    }
}
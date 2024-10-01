import { LinkBased } from "../link-based";
import { ModuleDecorator } from "@decorators";
import { StateKeys } from "@services/state/config";
import { Link } from "@app/shared";
import { MenuExtender } from "@app/shared";

import './navbar.scss';

@ModuleDecorator
export class Navbar extends LinkBased {
    screenWidth = this.appState.getData(StateKeys.device).width;

    protected init() {
        if (this.screenWidth <= 480) this.createHamburger();
        // this.createLogo();
        this.createLinks();
        // this.createLogin();
        setTimeout(() => this.setActive());
        if (this.screenWidth > 480) setTimeout(() => this.createExtender());
        this.appState.subscribe(StateKeys.stateNavigate, this.setActive.bind(this));
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
            for (const link of Array.from(this.gcElem('link')))
                link.addEventListener('click', () => hamburger.click());
        });
        this.append(hamburger);
    }

    private createExtender() {
        const links = this.gcElem('links')[0];
        if (links.clientHeight > 50) {
            const linksCollect = this.gcElem('link');
            let linksWidth = 0;
            for (const link of Array.from(linksCollect)) linksWidth += +link.getBoundingClientRect().width.toFixed(2);
            const idx = Math.floor(this.screenWidth / (linksWidth / linksCollect.length)) - 1;
            const toRemove = Array.from(links.children).splice(idx) as Link[];
            for (const link of toRemove) links.removeChild(link);
            this.gcElem('links')[0].append(new MenuExtender<Link>('dots', toRemove));
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
        const path = this.appState.getData(StateKeys.nav).pathname || '/home';
        const links = Array.from(this.gcElem('link'));
        for (const link of links) {
            (link as Link).dataset.href === encodeURI(path)
                ? link.classList.add('active')
                : link.classList.remove('active');
        }
    }
}
import { PageBase } from "@decorators";
import { State } from "@services/state/state";

export class Navigation {
    pages: { [k: string]: typeof PageBase<any> } = {};

    constructor(pages: {[k: string]: typeof PageBase<any>}){
        this.pages = pages;
    }

    get origin() {
        return location.origin;
    }
    get href() {
        return `${this.origin}/`;
    }
    get pathname() {
        return location.pathname;
    }
    get port() {
        return location.port;
    }
    get protocol() {
        return location.protocol;
    }

    getPage<T extends PageBase>(): new (appState: State) => T {
        document.title = `Vanilla | ${this.pathname === '/' ? 'Home' : this.pathname.replace(/(\/|\-)/g, ' ').trim().capitalize()}`;
        return (this.pages[this.pathname.toLocaleLowerCase()] ?? this.pages['/']) as new (appState: State) => T;
    }

    getClickedPage(page: string): void {
        window.history.pushState(null, '', page);
    }
}
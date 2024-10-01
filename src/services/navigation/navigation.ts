import { Home, Contact, Dialogs, Forms, GetStarted, Documentation } from "@app/pages";
import { PageBase } from "@decorators";
import { State } from "@services/state/state";

export class Navigation {
    pages: { [k: string]: typeof PageBase<any> } = {
        '/': Home,
        '/home': Home,
        '/get-started': GetStarted,
        '/forms': Forms,
        '/dialogs': Dialogs,
        '/docs': Documentation,
        '/contact-us': Contact,
    };
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
        return (this.pages[this.pathname.toLocaleLowerCase()] ?? Home) as new (appState: State) => T;
    }

    getClickedPage(page: string): void {
        window.history.pushState(null, '', page);
    }
}
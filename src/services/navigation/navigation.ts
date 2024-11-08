import { Loader } from "@app/shared";
import { StateKeys } from "@constants/stateKeys.constant";
import { Page } from "@decorators";
import { State } from "@services/state/state";

export interface IPages {
    [k: string]: typeof Page<any> | IPages;
}

export class Navigation {
    loader = new Loader();
    loadingPage: Page<any>;

    constructor(private state: State, private ref: HTMLElement, public pages: IPages, private basePath = '') {
        window.addEventListener("popstate", _ => {
            const crumbs = Navigation.breadCrumbs();
            if (crumbs[crumbs.length - 2] === this.basePath) this.loading(location.pathname);
        });
    }

    fisrtLoad(path: string): void {
        this.ref.append(this.loader);
        this.prepareNav(path);
    }

    loading(path: string): void {
        if (location.pathname.includes(path)) return;
        this.ref.replaceChild(this.loader, this.loadingPage);
        this.prepareNav(path);
    }

    showPage(): void {
        this.ref.replaceChild(this.loadingPage, this.loader);
    }

    private prepareNav(path: string): void {
        window.history.pushState(null, '', `${location.origin}${this.basePath}${path}`);
        const Page = this.getPage(path);
        const texts = this.state.getData(StateKeys.lang).getPageTexts(Page.name.toLowerCase());
        this.loadingPage = new Page(texts, this.state);
    }

    private getPage<T extends Page>(path: string): new (texts: Record<string, string>, appState: State) => T {
        const Page = this.pages[path] ?? this.pages['/'] ?? this.pages['/home'] ?? this.pages['/landing'];
        document.title = `Vanilla | ${(Page.name as string).addSpaces('uppercase')}`;
        return Page as new (texts: Record<string, string>, appState: State) => T;
    }

    static breadCrumbs(): string[] {
        return location.pathname.split('/');
    }
}
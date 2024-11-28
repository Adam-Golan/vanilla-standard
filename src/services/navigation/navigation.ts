import { Loader } from "@app/shared";
import { Device } from "@services/device/device";
import { Language } from "@services/language/language";
import type { Page } from "@decorators";
import type { State } from "@services/state/state";
import { StateKeys } from "@constants/stateKeys.constant";

export type IPages = Map<string, typeof Page<any>>;

export class Navigation<IState = Record<string, any>> {
    private loader = new Loader();
    private loadingPage: Page<any>;
    private i18n = new Language();
    private history: string[] = [];

    constructor(private state: State<IState>, private ref: HTMLElement, public pages: IPages, private homePage = 'home', private basePath = '') {
        this.slashPaths();
        this.subscribes();
        window.addEventListener('popstate', () => this.fisrtLoad());
        window.addEventListener('hashchange', () => history.replaceState(null, '', window.location.pathname), { once: true });
    }

    private slashPaths(): void {
        const slashed: IPages = new Map();
        for (const [path, Page] of this.pages.entries()) slashed.set(`${this.basePath}/${path}`, Page);
        this.pages = slashed;
        // console.log('slashPaths: ', this.pages);
    }

    public async importTexts(): Promise<void> {
        await this.i18n.importTexts(Device.lang);
        this.fisrtLoad();
    }

    public setTexts(texts: any): void {
        this.i18n.texts = texts;
        this.fisrtLoad();
    }

    private fisrtLoad(): void {
        const url = this.history[this.history.length - 2] ?? location.pathname;
        const idx = url.indexOf(this.basePath) + this.basePath.length + 1;
        const path = url.slice(idx);
        Array.from(this.ref.children).forEach(child => !child.classList.contains('navbar') ? this.ref.removeChild(child) : null);
        this.ref.append(this.loader);
        // this.log('fisrtLoad', path || this.homePage);
        this.navLogic(path || this.homePage);
    }

    private loading(path: string): void {
        // this.log('loading', path);
        if (location.pathname.includes(path)) return;
        this.ref.replaceChild(this.loader, this.loadingPage);
        const pathArr = path.split('/').filter(str => str !== this.basePath);
        this.navLogic(pathArr[0] || this.homePage);
    }

    private navLogic(path: string): void {
        if (path.includes('/')) path = path.split('/').filter(str => str !== this.basePath)[0];
        // this.log('navLogic', path);
        document.title = `Vanilla | ${(path).addSpaces('-').titleCase()}`;
        if (this.pages.has(`${this.basePath}/${path}`)) {
            this.history.push(`${this.basePath}/${path}`);
            window.history.pushState(null, '', this.history.last);
            const Page = this.getPage(path);
            if (Page.name === this.loadingPage?.constructor.name) return;
            const texts = this.i18n.getTexts(path.remove(/(\-|\/)/));
            this.loadingPage = new Page(texts, this.state);
        }
    }

    private getPage<T extends Page>(path: string): new (texts: Record<string, string>, state: State<IState>) => T {
        // this.log('getPage', path);
        const Page = this.pages.get(`${this.basePath}/${path}`);
        return Page as new (texts: Record<string, string>, state: State<IState>) => T;
    }

    private subscribes(): void {
        // Page Navigation.
        this.state.subscribe(StateKeys.navigate, (path) => this.loading(path));
        // Load Page.
        this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => this.ref.replaceChild(this.loadingPage, this.loader));
        // Send Paths
        // this.state.subscribe(`${this.basePath}:${StateKeys.getPaths}`, (cb: (paths: string[]) => void) => cb(Array.from(this.pages.keys())));
    }

    private log(fnName: string, path: string): void {
        console.log('base path:', this.basePath, `\n${fnName}: `, path);
    }

    static lastCrumb(): string {
        return location.pathname.slice(1).split('/').last;
    }
}
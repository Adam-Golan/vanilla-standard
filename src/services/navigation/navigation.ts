import { Loader } from "@app/shared";
import { Device } from "@services/device/device";
import { Language } from "@services/language/language";
import type { Page } from "@decorators";
import type { State } from "@services/state/state";
import { StateKeys } from "@constants/stateKeys.constant";
import { INavigationTree, IPages, IPage } from "./types";

export class Navigation {
    public tree: INavigationTree;
    private loader = new Loader({});
    private currentPage: Page<any>;
    private i18n = new Language();

    constructor(private state: State, private ref: HTMLElement, private pages: IPages, private homePage = '/home', public basePath = '/') {
        window.addEventListener('popstate', () => this.fisrtLoad());
        window.addEventListener('hashchange', () => history.replaceState(null, '', window.location.pathname), { once: true });
        this.init();
    }

    private init(): void {
        if (this.basePath.length > 1) this.addBasePath();
        this.buildTreeMap();
        this.subscribes();
    }

    // ------------------------------
    // Initiation section.
    // ------------------------------
    private buildTreeMap(): void {
        const buildNode = (path: string, page: IPage): INavigationTree => {
            return {
                path,
                label: path.slice(1).split('/').last.titleCase().addSpaces('-'),
                children: page.getPages ? Array.from(page.getPages().entries()).map(([childPath, Page]) => buildNode(`${path}${childPath}`, Page)) : [],
            }
        }
        this.tree = {
            path: this.basePath,
            label: this.basePath.slice(1) || 'root',
            children: Array.from(this.pages.entries()).map(([path, Page]) => buildNode(path, Page))
        };
    }

    private addBasePath(): void {
        const slashed: IPages = new Map();
        for (const [path, Page] of this.pages.entries()) slashed.set(`${this.basePath}${path}`, Page);
        this.pages = slashed;
        // console.log('addBasePath: ', this.pages);
    }

    private subscribes(): void {
        // Page Navigation.
        this.state.subscribe(`${this.basePath}:${StateKeys.navigate}`, (path) => this.loadingProcess(path));
        // Load Page.
        this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => this.ref.replaceChild(this.currentPage, this.loader));
    }

    // ------------------------------
    // Texts handles.
    // ------------------------------
    public async importTexts(): Promise<void> {
        await this.i18n.importTexts(Device.lang);
        this.fisrtLoad();
    }

    public setTexts(texts: any): void {
        this.i18n.texts = texts;
        this.fisrtLoad();
    }

    // ------------------------------
    // Loading section.
    // ------------------------------
    private fisrtLoad(): void {
        Array.from(this.ref.children).forEach(child => !child.classList.contains('navbar') ? this.ref.removeChild(child) : null);
        this.ref.append(this.loader);
        const path = this.findPage();
        // this.log('fisrtLoad', path);
        window.history.pushState(null, '', `${this.getBasePath()}${path}`);
        this.navigationLogic();
    }

    private loadingProcess(path: string): void {
        if (location.pathname === path) return;
        // this.log('loadingProcess', path);
        window.history.pushState(null, '', `${this.getBasePath()}${path}`);
        try {
            this.ref.replaceChild(this.loader, this.currentPage);
        } catch (_) {
            this.fisrtLoad();
        }
        this.navigationLogic();
    }

    private navigationLogic(): void {
        const path = this.findPage();
        // this.log('navigationLogic', `${this.getBasePath()}${path}`);
        document.title = `Vanilla | ${(path).slice(1).addSpaces('-').titleCase()}`;
        const Page = this.getPage(path);
        if (Page.name === this.currentPage?.constructor.name && !location.pathname.includes(path)) return;
        const texts = this.i18n.getTexts(path.remove(/(\-|\/)/));
        this.currentPage = new Page(texts, this.state);
    }

    // ------------------------------
    // Utilities.
    // ------------------------------
    private getPage(path: string): IPage {
        // this.log('getPage', path);
        return this.pages.get(`${this.getBasePath()}${path}`) as IPage;
    }

    private findPage(): string {
        if (location.pathname === this.basePath) return this.homePage;
        const pathArr = location.pathname.slice(1).split('/');
        for (let i = 0; i < pathArr.length; i++) {
            if (this.basePath === `/${pathArr[i]}`) continue;
            if (this.pages.has(`${this.getBasePath()}/${pathArr[i]}`)) return `/${pathArr[i]}`;
        }
        return this.homePage;
    }

    private getBasePath(): string {
        return this.basePath === '/' ? '' : this.basePath;
    }

    private log(fnName: string, path: string): void {
        console.log('base path:', this.basePath, `\n${fnName}: `, path);
    }

    // ------------------------------
    // Statics.
    // ------------------------------
    static lastCrumb(): string {
        return location.pathname.slice(1).split('/').last;
    }
}
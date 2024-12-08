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
    private cachedPages: Map<string, Page<any>> = new Map();
    private i18n = new Language();
    private history: string[] = [];

    /**
     * Constructs a new Navigation instance.
     *
     * @param state - The application state used for storing and retrieving data.
     * @param ref - The HTML element that serves as the reference for navigation rendering.
     * @param pages - The collection of pages available for navigation.
     * @param homePage - The default home page path. Defaults to '/home'.
     * @param basePath - The base path for navigation. Defaults to '/'.
     * 
     * Sets up event listeners for 'popstate' and 'hashchange' to handle navigation
     * state changes and initializes the navigation.
     */
    constructor(private state: State, private ref: HTMLElement, private pages: IPages, private homePage = '/home', public basePath = '/') {
        window.addEventListener('popstate', () => {
            this.history[this.history.length - 2]
                ? this.loadingProcess(this.history[this.history.length - 2])
                : this.fisrtLoad();
        });
        window.addEventListener('hashchange', () => history.replaceState(null, '', window.location.pathname));
        this.init();
    }

    /**
     * Initializes the navigation tree and sets up event listeners.
     *
     * This method is called by the constructor and is responsible for
     * initializing the navigation tree and setting up event listeners.
     * It calls the `addBasePath` method to add the base path to the
     * window's location, builds the navigation tree using the `buildTreeMap`
     * method, and sets up event listeners using the `subscribes` method.
     */
    private init(): void {
        if (this.basePath.length > 1) this.addBasePath();
        this.buildTreeMap();
        this.subscribes();
    }

    // ------------------------------
    // Initiation section.
    // ------------------------------

    /**
     * Constructs the navigation tree structure from the provided pages.
     *
     * This function initializes the navigation tree (`this.tree`) by iterating over
     * the `pages` map and creating a hierarchical structure. Each page is converted
     * into a tree node with a path, label, and children nodes (if applicable).
     * The paths are modified to include the base path and labels are formatted
     * to be human-readable.
     *
     * The `buildNode` helper function is used recursively to create nodes for each
     * page and its children, if any. The resulting tree structure is stored in the
     * `this.tree` property.
     */
    private buildTreeMap(): void {
        /**
         * Recursive function to build a navigation tree node from a page and its path.
         *
         * @param path - The path of the page.
         * @param page - The page object itself.
         * @returns A tree node with the path, label, and children nodes (if any).
         */
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

    /**
     * Prepends the base path to each entry in the pages map.
     *
     * Iterates through the existing pages map and creates a new map,
     * adding the base path to each page's path. The updated map
     * replaces the existing pages map.
     *
     * @private
     */
    private addBasePath(): void {
        const slashed: IPages = new Map();
        for (const [path, Page] of this.pages.entries()) slashed.set(`${this.basePath}${path}`, Page);
        this.pages = slashed;
        // console.log('addBasePath: ', this.pages);
    }

    /**
     * Subscribes to events.
     *
     * Listens to ${StateKeys.navigate} and ${StateKeys.contentReady} events.
     *
     * When ${StateKeys.navigate} is emitted, it calls the loadingProcess method
     * with the path provided in the event.
     *
     * When ${StateKeys.contentReady} is emitted, it replaces the loading
     * component with the current page.
     */
    private subscribes(): void {
        // Page Navigation.
        this.state.subscribe(`${this.basePath}:${StateKeys.navigate}`, (path) => this.loadingProcess(path));
        // Load Page.
        this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => this.ref.replaceChild(this.currentPage, this.loader));
    }

    // ------------------------------
    // Texts handles.
    // ------------------------------

    /**
     * Sets the texts for the navigation service from the i18n module and triggers the first load of the application.
     * @async
     * @returns A promise that resolves when the texts have been imported.
     */
    public async importTexts(): Promise<void> {
        await this.i18n.importTexts(Device.lang);
        this.fisrtLoad();
    }

    /**
     * Sets the texts for the navigation service and triggers the first load of the application.
     * @param texts - The texts to be used by the navigation service.
     */
    public setTexts(texts: any): void {
        this.i18n.texts = texts;
        this.fisrtLoad();
    }

    // ------------------------------
    // Loading section.
    // ------------------------------
    /**
     * Reloads the page by replacing the current page with the loader
     * and triggering the navigation logic.
     */
    public reload(): void {
        this.ref.replaceChild(this.loader, this.currentPage);
        this.navigationLogic();
    }

    /**
     * Performs the initial page load by removing all children of the reference
     * element except for the navbar, then appends the loader to the reference
     * element. Finally, it triggers the navigation logic.
     */
    private fisrtLoad(): void {
        Array.from(this.ref.children).forEach(child => !child.classList.contains('navbar') ? this.ref.removeChild(child) : null);
        this.ref.append(this.loader);
        // this.log('fisrtLoad', path);
        this.navigationLogic();
    }

    /**
     * Loading process.
     * @param path Path that will be loaded.
     * @remarks
     * This method is called when the page needs to be reloaded (e.g. when the user clicks on a link),
     * or when the page is loaded for the first time (e.g. when the user enters the page directly by URL).
     * It checks if the page is already loaded, if yes, it returns.
     * If not, it pushes the state to the browser history,
     * replaces the current content with the loader,
     * and calls the navigation logic.
     * If an error occurs, it calls the first load method.
     */
    private loadingProcess(path: string): void {
        if (location.pathname === path) return;
        // this.log('loadingProcess', path);
        this.pushState(path);
        try {
            this.ref.replaceChild(this.loader, this.currentPage);
            this.navigationLogic();
        } catch (_) {
            this.fisrtLoad();
        }
    }

    /**
     * Finds the page in the current path and shows it.
     *
     * If the page is cached, it just shows it.
     * If the page is not cached, it creates it and caches it.
     *
     * @memberof Navigation
     */
    private navigationLogic(): void {
        const path = this.findPage();
        // this.log('navigationLogic', `${this.getBasePath()}${path}`);
        document.title = `Vanilla | ${(path).slice(1).addSpaces('-').titleCase()}`;
        if (this.cachedPages.has(path)) {
            this.currentPage = this.cachedPages.get(path)!;
            this.ref.replaceChild(this.currentPage, this.loader);
            if (this.currentPage.navigation) this.currentPage.navigation.reload();
        } else {
            const Page = this.getPage(path);
            if (Page.name === this.currentPage?.constructor.name && !location.pathname.includes(path)) return;
            const texts = this.i18n.getTexts(path.remove(/(\-|\/)/));
            this.cachedPages.set(path, new Page(texts, this.state));
            this.currentPage = this.cachedPages.get(path)!;
        }
    }

    // ------------------------------
    // Utilities.
    // ------------------------------
    /**
     * Retrieves the page associated with the given path.
     *
     * Constructs the full path using the base path and the provided path,
     * and then retrieves the corresponding page from the pages map.
     *
     * @param path The relative path to the page.
     * @private
     */
    private getPage(path: string): IPage {
        // this.log('getPage', path);
        return this.pages.get(`${this.getBasePath()}${path}`) as IPage;
    }

    /**
     * Determines the page path based on the current location pathname.
     * If the pathname matches the base path, it returns the home page path.
     * Iterates through segments of the pathname to find a matching page in the pages map.
     * If a match is found, returns the corresponding path.
     * If no match is found, returns the home page path.
     * 
     * @returns The path of the page to navigate to.
     * @private
     */
    private findPage(): string {
        // this.log('findPage', location.pathname);
        if (location.pathname === this.basePath) return this.homePage;
        const pathArr = location.pathname.slice(1).split('/');
        for (let i = 0; i < pathArr.length; i++) {
            if (this.basePath === `/${pathArr[i]}`) continue;
            if (this.pages.has(`${this.getBasePath()}/${pathArr[i]}`)) return `/${pathArr[i]}`;
        }
        return this.homePage;
    }

    /**
     * Pushes a new state to the browser's history stack.
     * @param path The path to push to the history stack.
     * @private
     */
    private pushState(path: string): void {
        this.history.push(path);
        window.history.pushState(null, '', `${this.getBasePath()}${path}`);
    }

    /**
     * Returns the base path for the navigation system. If the base path is a single slash,
     * it returns an empty string. Otherwise, it returns the base path as is.
     * @returns The base path for the navigation system, or an empty string if the base path is a single slash.
     * @private
     */
    private getBasePath(): string {
        return this.basePath === '/' ? '' : this.basePath;
    }

    /**
     * Logs a message to the console for debugging purposes.
     * @param fnName The name of the function that called this method.
     * @param path The path that was passed to the function.
     * @private
     */
    private log(fnName: string, path: string): void {
        console.log('base path: ', this.basePath, `\n${fnName}: `, path, '\n-----------------------------');
    }

    // ------------------------------
    // Statics.
    // ------------------------------
    /**
     * Returns the last path segment of the current URL.
     * @returns The last path segment of the current URL.
     */
    static lastCrumb(): string {
        return location.pathname.slice(1).split('/').last;
    }
}
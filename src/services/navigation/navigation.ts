import { Loader } from "@app/shared";
import { Device } from "@services/device/device";
import { Language } from "@services/language/language";
import type { Page } from "@decorators";
import type { State } from "@services/state/state";
import { StateKeys } from "@constants/stateKeys.constant";
import { INavigationTree, IPages, IPage } from "./types";

export class Navigation<IState = Record<string, any>> {
    public tree: INavigationTree;
    private loader = new Loader();
    private loadingPage: Page<any>;
    private i18n = new Language();
    private history: string[] = [];

    /**
     * Constructs a new Navigation class.
     * 
     * @param state The state manager of the app/page.
     * @param ref The element that the navigation control its content, will toggle the loader and the content.
     * @param pages Map of pages, used to get the page class and mapping the tree.
     * @param homePage The name of the fallback page.
     * @param basePath The base path for this navigation. This is used to prefix the path of the children.
     */
    constructor(private state: State<IState>, private ref: HTMLElement, private pages: IPages, private homePage = 'home', private basePath = '') {
        window.addEventListener('popstate', () => this.fisrtLoad());
        window.addEventListener('hashchange', () => history.replaceState(null, '', window.location.pathname), { once: true });
        this.init();
    }

    /**
     * Initializes the navigation.
     * 
     * This method is called only once when the Navigation class is instantiated.
     * It does the following:
     * - slashes all paths in the navigation tree
     * - builds the navigation tree from the pages collection
     * - subscribes to the state changes
     */
    private init(): void {
        this.slashPaths();
        this.buildTreeMap();
        this.subscribes();
    }

    /**
     * Builds the navigation tree.
     * 
     * The tree is composed of nodes with the following properties:
     * - path: the path of the node
     * - label: the label of the node (usually the page name)
     * - children: an array of child nodes
     * 
     * The tree is built by recursively calling the buildNode function, which takes a path and a page class as arguments.
     * The function returns a navigation tree node with the given path and label, and an array of child nodes if the page has children.
     * If the page does not have children, the children array is empty.
     * The root node of the tree is the one with path '/' and label 'root'.
     * The children of the root node are the pages with paths that start with the base path.
     * The base path is the path of the root node, without the leading slash.
     * For example, if the base path is 'home', the children of the root node are the pages with paths that start with '/home/'
     */
    private buildTreeMap(): void {
        /**
         * Builds the navigation tree.
         * @param path the path of the node
         * @param page the page class
         * @returns the navigation tree node
         */
        const buildNode = (path: string, page: IPage): INavigationTree => {
            return {
                path,
                label: page.name,
                children: page.getPages ? Array.from(page.getPages().entries()).map(([childPath, Page]) => buildNode(`${path}/${childPath}`, Page)) : [],
            }
        }
        this.tree = {
            path: `/${this.basePath}`,
            label: this.basePath || 'root',
            children: Array.from(this.pages.entries()).map(([path, Page]) => buildNode(path, Page))
        };
    }

    /**
     * Slashes the paths of the pages.
     * This function is needed because the paths of the pages are not
     * slashed when the page is created.
     * The function takes the base path and the pages map,
     * and returns a new map with the paths slashed.
     * The function is called at the end of the constructor.
     */
    private slashPaths(): void {
        const slashed: IPages = new Map();
        for (const [path, Page] of this.pages.entries()) slashed.set(`${this.basePath}/${path}`, Page);
        this.pages = slashed;
        // console.log('slashPaths: ', this.pages);
    }

    /**
     * Imports the text resources for the current language using the `Language` service.
     * 
     * It dynamically loads the language-specific text data based on the device's language setting.
     * Once the texts are imported, it triggers the initial loading of the page content.
     * 
     * @returns A promise that resolves when the text resources have been successfully imported.
     */
    public async importTexts(): Promise<void> {
        await this.i18n.importTexts(Device.lang);
        this.fisrtLoad();
    }

    /**
     * Sets the text resources for the current language using the `Language` service.
     * 
     * It takes the language-specific text data as an argument and assigns it to the
     * `Language` service. Once the texts are set, it triggers the initial loading of
     * the page content.
     * 
     * @param texts - The language-specific text data to be set.
     */
    public setTexts(texts: any): void {
        this.i18n.texts = texts;
        this.fisrtLoad();
    }

    /**
     * This function is called when the page is first loaded.
     * It is also called when the user navigates to the page using the browser's back or forward buttons.
     * It gets the current path from the URL, removes any existing content from the page, and then
     * calls the `navLogic` function to load the content for the current path.
     * If the path is not specified, it defaults to the home page.
     */
    private fisrtLoad(): void {
        const url = this.history[this.history.length - 2] ?? location.pathname;
        const idx = url.indexOf(this.basePath) + this.basePath.length + 1;
        const path = url.slice(idx);
        Array.from(this.ref.children).forEach(child => !child.classList.contains('navbar') ? this.ref.removeChild(child) : null);
        this.ref.append(this.loader);
        // this.log('fisrtLoad', path || this.homePage);
        this.navLogic(path || this.homePage);
    }

    /**
     * Handles the loading of a new page by replacing the current page with a loader.
     *
     * It first checks if the current location pathname already includes the provided path.
     * If it does, the function exits early without performing any action.
     * Otherwise, it replaces the current page with a loader component.
     * It then splits the path into segments, filtering out the base path, and
     * uses the first segment to navigate to the corresponding page using `navLogic`.
     *
     * @param path - The path of the page to be loaded.
     */
    private loading(path: string): void {
        // this.log('loading', path);
        if (location.pathname.includes(path)) return;
        this.ref.replaceChild(this.loader, this.loadingPage);
        const pathArr = path.split('/').filter(str => str !== this.basePath);
        this.navLogic(pathArr[0] || this.homePage);
    }

    /**
     * Handles the navigation logic for the page.
     * It sets the new page title, adds the new path to the browser history,
     * and loads the corresponding page component.
     * If the path is a nested route, it takes the first segment of the path as the page name.
     * If the new page name is the same as the current page name, the function exits early without performing any action.
     * @param path - The path of the page to be loaded.
     */
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
            this.loadingPage = new Page(texts, this.state as any);
        }
    }

    /**
     * Gets the page class from the pages map using the provided path.
     * It prepends the base path to the provided path and uses the resulting path to access the page from the map.
     * If the page class is found, it is returned. Otherwise, the function returns undefined.
     * The log function is called with 'getPage' and the path as arguments.
     * @param path - The path of the page to be retrieved.
     * @returns The page class if found, otherwise undefined.
     */
    private getPage(path: string): IPage {
        // this.log('getPage', path);
        return this.pages.get(`${this.basePath}/${path}`) as IPage;
    }

    /**
     * Subscribes to events that trigger page navigation and loading.
     * Listens for the 'navigate' event on the state service and calls the loading function when triggered.
     * Also listens for the 'contentReady' event for the current base path and replaces the loader with the loaded page when triggered.
     */
    private subscribes(): void {
        // Page Navigation.
        this.state.subscribe(StateKeys.navigate, (path) => this.loading(path));
        // Load Page.
        this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => this.ref.replaceChild(this.loadingPage, this.loader));
    }

    /**
     * Logs a message to the console for debugging purposes.
     * 
     * This function is used to log information about the current page navigation
     * and loading. It takes the name of the function that called it and the current
     * path as arguments, and logs a message with the current base path, function name,
     * and path.
     * @param fnName - The name of the function that called this function.
     * @param path - The current path of the page.
     */
    private log(fnName: string, path: string): void {
        console.log('base path:', this.basePath, `\n${fnName}: `, path);
    }

    /**
     * Retrieves the last segment of the current URL path.
     * 
     * The function slices the pathname from the location object,
     * splits it into segments, and returns the last segment.
     * This is typically used to identify the last navigated page
     * or section in a web application.
     * 
     * @returns The last segment of the current URL path as a string.
     */
    static lastCrumb(): string {
        return location.pathname.slice(1).split('/').last;
    }
}
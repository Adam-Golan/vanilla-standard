import { ComponentData } from "@decorators";
import type { IPages, State } from "@services";
import type { ILink, ILinks } from "./intefaces";
import { StateKeys } from "@constants/stateKeys.constant";
import { Link } from "./shared/link";

export abstract class LinkBased<IState> extends ComponentData<IPages> {
    links: ILinks = [];

    constructor(protected pages: IPages, protected state: State<IState>) {
        super(pages);
        this.links = this.prepareLinks();
    }

    private prepareLinks(pages = this.pages): ILinks {
        const links = [];
        for (const key of pages.keys()) {
            links.push({ href: key, text: key.slice(key.lastIndexOf('/') + 1) });
            // value.prototype instanceof Page
            //     ? links.push({ href: key, text: key })
            //     : links.push({ [key]: this.prepareLinks(value as IPages) });
        }
        return links;
    }

    protected createLinks(links: ILinks = this.links, lvl = 0): HTMLDivElement {
        const linkContainer = this.cElem('div');
        linkContainer.className = lvl ? 'links lvl' : 'links';
        for (const link of links) {
            if (LinkBased.isILink(link)) {
                linkContainer.append(new Link(link, this.navigate.bind(this)));
            } else {
                const drawer = this.cElem('span');
                drawer.className = 'drawer';
                for (const key of Object.keys(link)) linkContainer.append(this.createLinks(link[key], lvl + 1));
            }
        }
        return linkContainer;
    }

    protected navigate(href: string): void {
        this.state.publish(StateKeys.navigate, href);
    }

    static isILink(item: ILink | { [key: string]: ILinks }): item is ILink {
        return typeof item === 'object' && 'text' in item && 'href' in item;
    }
}
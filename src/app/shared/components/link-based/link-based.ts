import { Component } from "@decorators";
import type { State } from "@services";
import type { ILink, ILinks } from "./intefaces";
import { StateKeys } from "@constants/stateKeys.constant";
import { Link } from "./shared/link";
import { INavigationTree } from "@services/navigation/types";
import { MenuExtender } from "../dialogs";

type MenuItem = Link | MenuExtender<MenuItem>;

export abstract class LinkBased<IState> extends Component<INavigationTree['children']> {
    links: ILinks = [];

    constructor(protected pages: INavigationTree['children'], protected state: State<IState>, type: 'top' | 'side' = 'top') {
        super(pages);
        this.classList.add(type);
        this.links = this.prepareLinks();
    }

    private prepareLinks(pages = this.pages): ILinks {
        const links = [];
        for (const page of pages) {
            page.children.length
                ? links.push({ [page.path.slice(page.path.lastIndexOf('/') + 1)]: this.prepareLinks(page.children) })
                : links.push({ href: page.path, text: page.label.addSpaces('uppercase').titleCase() });
        }
        return links;
    }

    protected createLinks(links: ILinks = this.links): MenuItem[] {
        const linkArr = [];
        for (const link of links) {
            if (LinkBased.isILink(link))
                linkArr.push(new Link(link, this.navigate.bind(this)));
            else
                for (const subLink of Object.values(link)) linkArr.push(new MenuExtender<MenuItem>(this.createLinks(subLink), Object.keys(link)[0]));
        }
        return linkArr;
    }

    protected navigate(href: string): void {
        this.state.publish(StateKeys.navigate, href);
    }

    static isILink(item: ILink | { [key: string]: ILinks }): item is ILink {
        return typeof item === 'object' && 'text' in item && 'href' in item;
    }
}
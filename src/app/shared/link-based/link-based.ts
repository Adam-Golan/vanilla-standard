import { ModuleBase } from "@decorators";
import { State } from "@services";
import { ILink } from "./intefaces";
import { StateKeys } from "@services/state/config";
import { Link } from "./shared/link";

export abstract class LinkBased<IText = any> extends ModuleBase<IText> {
    links: ILink[] = [];
    constructor(protected appState: State) {
        super();
        this.links = Object.keys(this.appState.getData(StateKeys.nav).pages).map((key) => ({ href: key, text: key.replace('/', '') }));
        this.links.splice(0, 1);
    }

    protected createLinks(links: ILink[] = this.links): void {
        const linkContainer = this.cElem('div');
        linkContainer.className = 'links';
        links.forEach(link => {
            if (link.text.length) {
                const linkEl = new Link(this.navigate.bind(this));
                linkEl.texts = link;
                linkContainer.append(linkEl);
            }
        });
        this.append(linkContainer);
    }

    protected navigate(link: ILink): void {
        this.appState.publish(StateKeys.stateNavigate, link.href);
    }
}
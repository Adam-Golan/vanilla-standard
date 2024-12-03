import { home } from "@i18n/en/home/home";
import { LinkBased } from "../link-based";
import { ComponentDecorator } from "@decorators";
import type { IPages, State } from "@services";

@ComponentDecorator
export class Footer<IState = Record<string, any>> extends LinkBased<IState> {
    protected initOverride(): void {
        throw new Error("Method not implemented.");
    }
    constructor(protected pages: IPages, protected appState: State<IState>, private texts: typeof home.FOOTER) {
        super(pages, appState);
    }
    protected init(): void {
        this.append(this.createLogo(), this.createLinks(), this.createRights());
    }

    private createLogo(): HTMLDivElement {
        const logo = this.cElem('div');
        logo.className = 'logo';
        return logo;
    }

    private createRights(): HTMLDivElement {
        const rights = this.cElem('div');
        rights.className = 'rights';
        rights.innerHTML = this.texts.RIGHTS;
        return rights;
    }
}
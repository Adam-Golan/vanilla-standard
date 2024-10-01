import { home } from "@i18n/en/home/home";
import { LinkBased } from "../link-based";
import { ModuleDecorator } from "@decorators";

@ModuleDecorator
export class Footer extends LinkBased<typeof home.FOOTER> {
    protected init(): void {
        this.createLogo();
        this.createLinks();
        this.createRights();
    }

    private createLogo(): void {
        const logo = this.cElem('div');
        logo.className = 'logo';
        this.append(logo);
    }

    private createRights(): void {
        const rights = this.cElem('div');
        rights.className = 'rights';
        rights.innerHTML = this.texts.RIGHTS;
        this.append(rights);
    }
}
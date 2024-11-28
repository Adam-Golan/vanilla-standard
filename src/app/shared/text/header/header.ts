import { Component, ComponentDecorator } from "@decorators";
import { IHeaderText } from "./lang";

import './header.scss';

@ComponentDecorator
export class Header extends Component<IHeaderText> {
    protected init(): void {
        const h1 = this.cElem('h1');
        const h2 = this.cElem('h2');
        h1.innerText = this.config.header;
        h2.innerText = this.config.subHeader;
        this.append(h1, h2);
    }
}
import { ComponentDecorator } from "@decorators";
import { addMeta } from "@decorators/utils";

import './tester.scss';

@ComponentDecorator
export class Tester extends HTMLElement {
    constructor() {
        super();
        addMeta(this, 'component');
    }
}
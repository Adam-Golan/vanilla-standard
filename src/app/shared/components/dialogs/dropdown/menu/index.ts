import { ComponentDecorator } from "@decorators";
import { BaseDropdown } from "../base";

@ComponentDecorator
export class MenuDropdown<T extends HTMLElement> extends BaseDropdown<T> {
    protected createItem = (item: T) => item;

    constructor(protected list: T[]) {
        super(list, () => null);
    }
}
import { ComponentDecorator } from "@decorators";
import { BaseDropdown } from "../base";
import { IOptionProps } from "@app/shared/data/forms/interfaces/props/shared";

@ComponentDecorator
export class SelectDropdown extends BaseDropdown<IOptionProps> {

    protected createItem(item: IOptionProps): HTMLElement {
        const div = this.cElem('div');
        div.innerText = item.text;
        div.dataset.value = item.value ?? item.text;
        return div;
    }
}
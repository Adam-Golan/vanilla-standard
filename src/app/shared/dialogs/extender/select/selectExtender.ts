import { ComponentDecorator } from "@decorators";
import { BaseExtender } from "../base";
import { SelectDropdown } from "../../dropdown";
import { IOptionProps } from "@app/shared/forms/interfaces/props/shared";

@ComponentDecorator
export class SelectExtender extends BaseExtender<IOptionProps> {
    constructor(protected type: 'dots' | 'caret', protected list: IOptionProps[], private cb: (select: IOptionProps) => void) {
        super(type, list);
    }
    protected init(): void {
        this.dropdown = new SelectDropdown(this.list, this.cb);
        this.append(this.dropdown);
        super.init();
    }
}
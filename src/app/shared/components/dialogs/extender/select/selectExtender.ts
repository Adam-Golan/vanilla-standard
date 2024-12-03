import { ComponentDecorator } from "@decorators";
import { BaseExtender } from "../base";
import { SelectDropdown } from "../../dropdown";
import { IOptionProps } from "@app/shared/modules/form/interfaces/props/shared";

@ComponentDecorator
export class SelectExtender extends BaseExtender<IOptionProps> {
    constructor(protected list: IOptionProps[], protected type: 'dots' | 'caret', private cb: (select: IOptionProps) => void) {
        super(list, type);
    }
    protected init(): void {
        this.dropdown = new SelectDropdown(this.list, this.cb);
        this.append(this.dropdown);
        super.init();
    }
}
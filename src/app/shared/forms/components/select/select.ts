import { ComponentDecorator } from "@decorators";
import { FormMouseComponentBase } from "../base";
import { ISelectProps } from "../../interfaces/props";

@ComponentDecorator
export class Select extends FormMouseComponentBase<ISelectProps> {
    declare field: HTMLSelectElement;
    
    protected createMe() {
        const para = this.createFormGroup('select');
        // Implement Select.
        if (typeof this.props.required === 'boolean') this.field.required = this.props.required;
        this.field.append(...this.props.options.map(opt => {
            const option = this.cElem('option');
            option.innerText = opt.text;
            option.value = opt.value ?? opt.text;
            return option;
        }));
        this.props.placeholder?.length
            ? this.field.innerHTML = `<option disabled selected>${this.props.placeholder}</option>`
            : this.onInput(this.field.value.toLowerCase());
        return para;
    }

    reset(): void {
        this.field.selectedIndex = 0;
        super.reset();
    }
}
import { ComponentDecorator } from "@decorators";
import { FormMouseComponent } from "../base";
import { ISelectProps } from "../../interfaces/props";

import './select.scss';

@ComponentDecorator
export class Select extends FormMouseComponent<ISelectProps> {
    declare field: HTMLSelectElement;

    protected createMe(): HTMLFieldSetElement {
        const fieldset = this.createFormGroup('select');
        // Implement Select.
        if (typeof this.props.required === 'boolean') this.field.required = this.props.required;
        if (this.props.placeholder?.length) this.field.innerHTML = `<option disabled selected>${this.props.placeholder}</option>`;
        this.field.append(...this.props.options.map(opt => {
            const option = this.cElem('option');
            option.innerText = opt.text;
            option.value = opt.value ?? opt.text;
            return option;
        }));
        if (!this.props.placeholder?.length) setTimeout(() => this.field.dispatchEvent(new Event('input', { bubbles: true })));
        return fieldset;
    }

    reset(): void {
        this.field.selectedIndex = 0;
        super.reset();
    }
}
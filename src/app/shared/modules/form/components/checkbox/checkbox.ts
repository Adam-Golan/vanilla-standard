import { ComponentDecorator } from "@decorators";
import { FormComponent } from "../base";
import { ICheckboxProps } from "../../interfaces";

@ComponentDecorator
export class Checkbox extends FormComponent<ICheckboxProps> {
    declare field: HTMLInputElement;
    protected createMe(): HTMLFieldSetElement {
        const fieldset = this.createFormGroup('input');
        this.field.type = 'checkbox';
        this.field.checked = !!this.props.value;
        this.field.value = this.field.checked ? 'on' : 'off';
        this.field.oninput = () => this.onInput(this.field.value = this.field.checked ? 'on' : 'off');
        return fieldset;
    }
}
import { ComponentDecorator } from "@decorators";
import { FormKeyboardComponent } from "../base";
import { FilterDropdown } from "@app/shared";
import { IAutocompleteProps } from "../../interfaces";
import { IOptionProps } from "../../interfaces/props/shared";

import './autocomplete.scss';

@ComponentDecorator
export class Autocomplete extends FormKeyboardComponent<IAutocompleteProps> {
    declare field: HTMLInputElement;
    private dropdown: FilterDropdown;

    protected createMe(): HTMLFieldSetElement {
        const fieldset = this.createFormGroup('input');
        // Implement Input.
        this.field.type = this.props.type ?? 'text';
        if (this.props.pattern) this.field.pattern = this.props.pattern;
        if (this.props.value) this.field.value = this.props.value;
        this.dropdown = new FilterDropdown(this.props.options, this.select.bind(this));
        fieldset.insertBefore(this.dropdown, fieldset.querySelector('.form-output')!);
        this.field.addEventListener('focus', () => this.dropdown.open());
        this.field.addEventListener('blur', () => setTimeout(() => { this.dropdown.close(); this.checkError(); }, 250));
        return fieldset;
    }

    private select({ text }: IOptionProps): void {
        this.value = this.field.value = text;
        this.checkError();
        if (this.formCb) this.formCb();
        this.field.dispatchEvent(new Event('input', { bubbles: true }));
    }

    checkError(): void {
        super.checkError();
        setTimeout(() => {
            const diff = this.clsElem('form-group')[0]!.getBoundingClientRect().bottom - this.field.getBoundingClientRect().bottom;
            this.dropdown.style.setProperty('--topAdjust', `${diff}px`);
        }, 410);
    }

    onInput(value: string): void {
        this.dropdown.filter(value);
        this.value = this.props.dynamicOption ? value : '';
    }
}
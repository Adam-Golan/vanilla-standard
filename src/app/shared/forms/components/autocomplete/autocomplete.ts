import { ComponentDecorator } from "@decorators";
import { FormKeyboardComponentBase } from "../base";
import { FilterDropdown } from "@app/shared";
import { IAutocompleteProps } from "../../interfaces";
import { IOptionProps } from "../../interfaces/props/shared";

import './autocomplete.scss';

@ComponentDecorator
export class Autocomplete extends FormKeyboardComponentBase<IAutocompleteProps> {
    declare field: HTMLInputElement;
    private dropdown: FilterDropdown;

    protected createMe(): HTMLParagraphElement {
        const para = this.createFormGroup('input');
        // Implement Input.
        this.field.type = this.props.type ?? 'text';
        if (this.props.pattern) this.field.pattern = this.props.pattern;
        if (this.props.value) this.field.value = this.props.value;
        this.dropdown = new FilterDropdown(this.props.options, this.select.bind(this));
        para.append(this.dropdown);
        this.field.onfocus = () => this.dropdown.open();
        this.field.onblur = () => setTimeout(() => this.dropdown.close(), 250);
        return para;
    }

    private select({ text }: IOptionProps): void {
        super.onInput(text.toLowerCase());
        this.dispatchEvent(new InputEvent(text));
        this.field.dispatchEvent(new InputEvent(text));
    }

    onInput(value: string): void {
        super.onInput(this.props.dynamicOption ? value : '');
        this.dropdown.filter(value);
    }
}
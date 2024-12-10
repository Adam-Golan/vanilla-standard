import { ComponentDecorator } from "@decorators";
import { FormComponent } from "../base";
import { IRangeProps } from "../../interfaces";

import './range.scss';

@ComponentDecorator
export class Range extends FormComponent<IRangeProps> {
    declare field: HTMLInputElement;
    protected createMe(): HTMLFieldSetElement {
        const fieldset = this.createFormGroup('input');
        this.field.type = 'range';
        this.field.min = this.props.min;
        this.field.max = this.props.max;
        if (this.props.value) this.field.value = this.props.value;
        return fieldset;
    }
}
import { ComponentDecorator } from "@decorators";
import { FormKeyboardComponent } from "../base";
import { ITextareaProps } from "../../interfaces/props";

import './textarea.scss';

@ComponentDecorator
export class Textarea extends FormKeyboardComponent<ITextareaProps> {
    declare field: HTMLTextAreaElement;

    protected createMe(): HTMLFieldSetElement {
        return this.createFormGroup('textarea');
    }
}
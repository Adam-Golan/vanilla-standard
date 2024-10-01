import { ComponentDecorator } from "@decorators";
import { FormKeyboardComponentBase } from "../base";
import { ITextareaProps } from "../../interfaces/props";

@ComponentDecorator
export class Textarea extends FormKeyboardComponentBase<ITextareaProps> {
    declare field: HTMLTextAreaElement;
    
    protected createMe() {
        return this.createFormGroup('textarea');
    }
}
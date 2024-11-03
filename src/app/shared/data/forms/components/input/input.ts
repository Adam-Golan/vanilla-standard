import { ComponentDecorator } from "@decorators";
import { FormKeyboardComponent } from "../base";
import { IInputProps } from "../../interfaces/props";

@ComponentDecorator
export class Input extends FormKeyboardComponent<IInputProps> {
    declare field: HTMLInputElement;
    protected createMe() {
        const para = this.createFormGroup('input');
        // Implement Input.
        this.field.type = this.props.type ?? 'text';
        if (this.props.pattern) this.field.pattern = this.props.pattern;
        if (this.props.value) this.field.value = this.props.value;
        this.field.oninput = () => this.onInput(this.field.value = this.checkZero(this.field.value.toLowerCase()));
        return para;
    }

    private checkZero(val: string): string {
        if (this.props.pattern !== '[0-9]') return val;
        return val[0] === '0' ? this.removeZero(val) : val;
    }

    private removeZero(val: string): string {
        val = val.slice(1);
        return val[0] === '0' ? this.removeZero(val) : val;
    }
}
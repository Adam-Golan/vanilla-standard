import { ComponentDecorator } from "@decorators";
import { FormComponent } from "../base";
import { IRadioProps } from "../../interfaces";

import './radio.scss';

@ComponentDecorator
export class Radio extends FormComponent<IRadioProps> {
    declare field: HTMLInputElement;
    protected createMe(): HTMLFieldSetElement {
        this.field = this.cElem('input');
        const fieldset = this.cElem('fieldset'), legend = this.cElem('legend'), children: HTMLElement[] = [legend];
        fieldset.className = 'form-group';
        legend.innerHTML = this.props.label;
        for (const radio of this.props.values) {
            const div = this.cElem('div'), inp = this.cElem('input'), label = this.cElem('label');
            inp.type = 'radio';
            inp.name = this.props.name;
            inp.id = inp.value = label.htmlFor = label.innerText = radio;
            inp.oninput = () => inp.checked ? this.onInput(inp.value) : null;
            div.append(inp, label);
            children.push(div);
        }
        fieldset.append(...children);
        return fieldset;
    }
}
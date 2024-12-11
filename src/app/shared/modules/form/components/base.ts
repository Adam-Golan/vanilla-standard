import { Component } from "@decorators";
import { Props, InputType } from "../interfaces";

import './base.scss';

export abstract class FormComponent<P extends Props = Props> extends Component<P> {
    value: string = '';
    field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    hasError: boolean = false;
    formCb: () => void;

    constructor(public props: P) {
        super(props);
    }

    protected init(): void {
        this.hasError = !!(this.props.required && this.props.error?.length);
        this.prepend(this.createMe());
    }

    // Form Group Methods.
    // ---------------------------------------------------------------------------------------------
    // // Local creator.
    protected abstract createMe(): HTMLFieldSetElement;

    // // Generic creator -> paragraph(container), label, and field.
    protected createFormGroup(inpType: InputType): HTMLFieldSetElement {
        const [fieldset, label] = this.createBasicElements(inpType);
        // Classes implement.
        fieldset.className = label.className = this.field.className = 'form-';
        fieldset.className += 'group';
        label.className += 'label';
        this.field.className += `field ${inpType} ${this.constructor.name.toLowerCase()}`;
        const children: HTMLElement[] = [this.field];
        // Setting field.
        this.setField();
        // Setting paragraph.
        this.setFieldsetProps(fieldset);
        // Setting label if necessary.
        if (this.props.label?.length) this.setLabel(label) && children.unshift(label);
        // Setting accessibility.
        this.setAccessibility(children);
        fieldset.append(...children);
        // Setting error if necessary.
        if (this.props.error?.length) fieldset.append(this.createError());
        return fieldset;
    }
    // ---------------------------------------------------------------------------------------------

    // Elements Methods.
    // ---------------------------------------------------------------------------------------------
    // // Creates container and label.
    protected createBasicElements(inpType: InputType): [HTMLFieldSetElement, HTMLLabelElement] {
        this.field = this.cElem(inpType);
        return [this.cElem('fieldset'), this.cElem('label')];
    }
    // // Field.
    private setField() {
        this.field.id = this.field.name = this.props.name;
        if (this.props.placeholder?.length && !(this.field instanceof HTMLSelectElement)) this.field.placeholder = this.props.placeholder;
        this.field.oninput = () => this.onInput(this.field.value.toLowerCase());
        if (this.props.required) {
            this.field.addEventListener('focus', () => this.field.classList.remove('touched'));
            this.field.addEventListener('blur', () => this.field.classList.add('touched'));
        }
        this.field.autocomplete = this.props.autocomplete ?? 'off';
        this.field.ariaRequired = `${!!this.props.required}`;
    }

    // // Paragraph.
    private setFieldsetProps(para: HTMLFieldSetElement): void {
        if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
        if (typeof this.props.required === 'boolean') para.dataset.required = `${this.props.required}`;
    }

    // // Label.
    private setLabel(label: HTMLLabelElement): true {
        label.innerText = this.props.label as string;
        label.htmlFor = this.props.name;
        label.id = `${this.props.name}Label`;
        return true;
    }

    // // Accessibility
    private setAccessibility(children: HTMLElement[]): void {
        if (this.props.label?.length) this.field.setAttribute('aria-labelledby', `${this.props.name}Label`);
        if (this.props.ariaDescribedBy) {
            this.field.setAttribute('aria-describedby', `${this.props.name}Help`);
            const small = this.cElem('small');
            small.innerText = this.props.ariaDescribedBy;
            small.id = `${this.props.name}Help`;
            children.push(small);
        }
        if (this.props.ariaDescription) this.field.ariaDescription = this.props.ariaDescription;
    }
    // ---------------------------------------------------------------------------------------------

    // Value Methods.
    // ---------------------------------------------------------------------------------------------
    onInput(value: string): void {
        this.value = this.field.value = value;
        this.checkError();
        if (this.formCb) this.formCb();
    }

    reset(): void {
        this.field.value = '';
        this.hasError = !!(this.props.required && this.props.error?.length);
    }
    // ---------------------------------------------------------------------------------------------

    // Error Methods.
    // ---------------------------------------------------------------------------------------------
    private createError(): HTMLParagraphElement {
        const para = this.cElem('p');
        para.innerText = `${this.props.error}`;
        para.className = 'form-output';
        return para;
    }

    checkError(): void {
        if (this.props.error?.length) {
            this.hasError = !!(this.props.required && this.props.error?.length && (!this.value.length || this.value === 'off'));
            this.clsElem('form-output').item(0)?.classList[this.hasError ? 'add' : 'remove']('show');
        }
    }
    // ---------------------------------------------------------------------------------------------

    // Interface Methods.
    // ---------------------------------------------------------------------------------------------
    focus(): void {
        this.field?.focus();
    }
}

export abstract class FormKeyboardComponent<P extends Props = Props> extends FormComponent<P> {
    declare field: HTMLInputElement | HTMLTextAreaElement;

    reset(): void {
        super.reset();
        if (this.props.placeholder?.length) this.field.placeholder = this.props.placeholder;
    }
}

export abstract class FormMouseComponent<P extends Props = Props> extends FormComponent<P> {
    declare field: HTMLSelectElement;
}
import { Props } from "./base";

export interface IRangeProps extends Omit<Props, 'placeholder' | 'autocomplete' | 'required' | 'error'>, Pick<HTMLInputElement, 'min' | 'max'>, Partial<Pick<HTMLInputElement, 'value'>> {
    label: string;
}

export interface IRangeElement {
    type: 'range';
    props: IRangeProps;
}
import { Props } from "./base";

export interface IRangeProps extends Omit<Props, 'autocomplete' | 'placeholder'>, Pick<HTMLInputElement, 'min' | 'max'>, Partial<Pick<HTMLInputElement, 'value'>> {
    label: string;
}

export interface IRangeElement {
    type: 'range';
    props: IRangeProps;
}
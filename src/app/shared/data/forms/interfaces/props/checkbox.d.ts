import { Props } from "./base";

export interface ICheckboxProps extends Omit<Props, 'placeholder' | 'autocomplete'> {
    value?: boolean;
    label: string;
}

export interface ICheckboxElement {
    type: 'checkbox';
    props: ICheckboxProps;
}
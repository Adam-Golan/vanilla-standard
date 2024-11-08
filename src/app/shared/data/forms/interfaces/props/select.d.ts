import { Props } from "./base";
import { IOptionProps } from "./shared";

export interface ISelectProps extends Omit<Props, 'autocomplete'> { 
    options: IOptionProps[];
}

export interface ISelectElement {
    type: 'select';
    props: ISelectProps;
}
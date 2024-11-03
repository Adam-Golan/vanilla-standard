import { Props } from "./base";
import { IOptionProps } from "./shared";

export interface ISelectProps extends Props { 
    options: IOptionProps[];
}

export interface ISelectElement {
    type: 'select';
    props: ISelectProps;
}
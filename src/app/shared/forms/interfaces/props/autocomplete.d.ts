import { Props } from "./base";
import { IOptionProps } from "./shared";

export interface IAutocompleteProps extends Props, Partial<Pick<HTMLInputElement, 'pattern' | 'value' | 'type'>> {
    dynamicOption: boolean;
    options: IOptionProps[];
}

export interface IAutocompleteElement {
    type: 'autocomplete';
    props: IAutocompleteProps;
}
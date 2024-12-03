import { IInputElement, ITextareaElement, ISelectElement, IAutocompleteElement, ICheckboxElement, IRangeElement, IRadioElement, ISwitchElement } from "./props";

export interface IFormMap {
    legend?: string;
    fields: {
        [name: string]: IInputElement | ITextareaElement | ISelectElement | IAutocompleteElement | ICheckboxElement | IRangeElement | IRadioElement | ISwitchElement;
    }
}

export type IFormBtns = {
    type: "submit" | "reset" | "button";
    text: string;
    cb?: (query: { [name: string]: string }) => void;
}[];
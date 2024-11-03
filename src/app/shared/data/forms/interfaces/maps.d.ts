import { IInputElement, ITextareaElement, ISelectElement, IAutocompleteElement } from "./props";

export interface IFormMap {
    legend?: string;
    fields: {
        [name: string]: IInputElement | ITextareaElement | ISelectElement | IAutocompleteElement;
    }
}

export type IFormBtns = {
    type: "submit" | "reset" | "button";
    text: string;
    cb?: (query: { [name: string]: string }) => void;
}[];
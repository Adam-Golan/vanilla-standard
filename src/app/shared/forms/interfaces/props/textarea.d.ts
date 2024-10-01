import { Props } from "./base";

export interface ITextareaProps extends Props { }

export interface ITextareaElement {
    type: 'textarea';
    props: ITextareaProps;
}
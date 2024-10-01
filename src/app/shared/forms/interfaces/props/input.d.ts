import { Props } from "./base";

export interface IInputProps extends Props, Partial<Pick<HTMLInputElement, 'pattern' | 'value' | 'type'>> {
    multiplyBy?: string;
}

export interface IInputElement {
    type: 'input';
    props: IInputProps;
}
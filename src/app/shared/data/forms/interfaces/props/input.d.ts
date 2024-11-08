import { Props } from "./base";

export interface IInputProps extends Props, Partial<Pick<HTMLInputElement, 'pattern' | 'value'>> {
    multiplyBy?: string;
    type?: "color" | "date" | "datetime-local" | "email" | "image" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week";
}


export interface IInputElement {
    type: 'input';
    props: IInputProps;
}
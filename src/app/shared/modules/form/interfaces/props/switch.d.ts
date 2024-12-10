import { ICheckboxProps } from './checkbox';
export interface ISwitchElement {
    type: 'switch';
    props: Omit<ICheckboxProps, 'required' | 'error'>;
}
export interface Props extends Partial<Pick<HTMLInputElement, 'required' | 'dataset' | 'autocomplete' | 'placeholder' | 'ariaDescription'>>, Pick<HTMLInputElement, 'name'> {
    label?: string;
    error?: string;
    ariaDescribedBy?: string;
}
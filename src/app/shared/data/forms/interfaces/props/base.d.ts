export interface Props extends Partial<Pick<HTMLTextAreaElement, 'required' | 'dataset' | 'autocomplete' | 'placeholder' | 'ariaDescription'>>, Pick<HTMLTextAreaElement, 'name'> {
    label?: string;
    error?: string;
    ariaDescribedBy?: string;
}
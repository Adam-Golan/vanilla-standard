export interface Props extends Partial<Pick<HTMLTextAreaElement, 'required' | 'dataset' | 'autocomplete' | 'placeholder'>>, Pick<HTMLTextAreaElement, 'name'> {
    label?: string;
    error?: string;
}
export interface ICollapsible {
    summary: string;
    content: string;
    type?: 'info' | 'danger' | 'warn';
}
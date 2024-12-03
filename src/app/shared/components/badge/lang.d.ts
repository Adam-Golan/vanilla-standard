export interface IBadgeConfig {
    text: string;
    type: 'success' | 'info' | 'warn' | 'danger';
    pos: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
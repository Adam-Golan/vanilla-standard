export interface ITooltipText {
    type: 'i' | '?' | '!';
    text: string;
}

export interface ITooltipConfig extends ITooltipText {
    symbol?: boolean;
    label?: string;
}
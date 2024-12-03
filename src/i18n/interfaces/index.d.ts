import { FooterText } from '@app/shared/components/link-based/intefaces';

export interface BasePageText {
    FOOTER: FooterText;
}

export interface BaseText {
    TITLE: string;
}

export interface BaseExtendedText extends BaseText {
    DESC: string;
}

export interface BaseCardText extends BaseExtendedText {
    LINK?: string;
}
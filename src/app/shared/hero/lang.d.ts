import { ILink } from '@app/shared/link-based/intefaces';

export interface IHeroText {
    header: string;
    subHeader: string;
    img: string;
    anchor?: Pick<ILink, 'text' | 'href'>;
}
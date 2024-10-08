import { ILink } from '@app/shared/link-based/intefaces';

export interface IHeroText extends IHeaderText {
    img: string;
    anchor?: Pick<ILink, 'text' | 'href'>;
}
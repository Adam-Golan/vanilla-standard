import { ILink } from '@app/shared/data/link-based/intefaces';
import { IHeaderText } from '../header/lang';

export interface IHeroText extends IHeaderText {
    img: string;
    anchor?: Pick<ILink, 'text' | 'href'>;
}
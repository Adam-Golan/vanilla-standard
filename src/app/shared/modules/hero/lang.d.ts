import { ILink } from '@app/shared/components/link-based/intefaces';
import { IHeaderText } from './components/header/lang';

export interface IHeroText extends IHeaderText {
    img: string;
    anchor?: Pick<ILink, 'text' | 'href'>;
}
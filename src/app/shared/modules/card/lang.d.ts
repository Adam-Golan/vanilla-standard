import { ICollapsible } from '@app/shared/components/collapsible/lang';
import { IFormMap, IFormBtns } from '../forms/interfaces';

interface IBasicCard {
    title: string;
    description: string;
}

interface IMetricCard extends IBasicCard {
    price: string;
}

interface IInteractiveCard extends IBasicCard {
    form: {
        map: IFormMap;
        btns: IFormBtns;
    }
}

interface INotificationCard extends IBasicCard {
    actions: {
        type: 'submit' | 'reset' | 'button';
        text: string;
        cb: (data?: any) => void;
    }[];
}

interface ICollapsibleCard extends Partial<INotificationCard> {
    collapsible: ICollapsible;
}

interface IImageCard extends Partial<INotificationCard> {
    image: string;
}

interface IBlogCard extends IImageCard {
    author: string;
    date: string;
}

interface IProductCard extends IImageCard {
    price: string;
}

export type IAllCardKeys = keyof (ICardConfig<'metric'> & ICardConfig<'blog'>) | 'collapsible' | 'form';

export type ICardType = 'basic' | 'image' | 'profile' | 'product' | 'gallery' | 'metric' | 'notification' | 'collapsible' | 'blog' | 'interactive';

type CardTypeMap = {
    basic: IBasicCard;
    metric: IMetricCard;
    interactive: IInteractiveCard;
    notification: INotificationCard;
    collapsible: ICollapsibleCard;
    image: IImageCard;
    profile: IImageCard;
    gallery: IImageCard;
    blog: IBlogCard;
    product: IProductCard;
};

export type ICardConfig<T extends ICardType> = CardTypeMap[T];

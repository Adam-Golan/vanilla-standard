import { ModuleData, ModuleDecorator } from '@decorators';
import { ICardConfig, ICardType, IAllCardKeys } from './lang';
import { Collapsible } from '@app/shared/text';
import { Avatar } from '@app/shared/native';
import { Form } from '@app/shared/data';

import './card.scss';

@ModuleDecorator
export class Card<T extends ICardType> extends ModuleData<ICardConfig<T>> {

    constructor(private cardType: T, protected data: ICardConfig<T>) {
        super(data);
        this.classList.add(cardType);
    }

    protected init(): void {
        const sections = this.createCardSections();
        for (const section of sections) {
            const container = this.createCardSection(section);
            if (section === 'title') this.createTitle(container);
            if (section === 'description') this.createDesc(container);
            if (section === 'actions') this.createActions(container);
            if (section === 'collapsible') this.createCollpase(container);
            if (section === 'image') this.createImage(container);
            if (section === 'price' || section === 'date' || section === 'author') this.createPlainText(container, section);
            if (section === 'form') this.createForm(container);
            this.append(container);
        }
    }

    private createCardSections(): IAllCardKeys[] {
        const sections: IAllCardKeys[] = ['title', 'description'];
        switch (this.cardType) {
            case 'notification':
            case 'collapsible':
                sections.push('actions');
                if (this.cardType === 'collapsible') sections.push('collapsible');
                break;
            case 'blog':
            case 'gallery':
            case 'image':
            case 'product':
            case 'profile':
                sections.push('image', 'actions');
                if (this.cardType === 'blog') sections.push('author', 'date');
                if (this.cardType === 'product') sections.push('price');
                break;
            case 'metric':
                sections.push('price');
                break;
            case 'interactive':
                sections.push('form');
                break;
        };
        return sections;
    }

    private createCardSection(name: string): HTMLDivElement {
        const div = this.cElem('div');
        div.className = name;
        return div;
    }

    private createTitle(ref: HTMLDivElement): void {
        const header = this.cElem('h3');
        header.innerText = this.data.title;
        ref.append(header);
    }

    private createDesc(ref: HTMLDivElement): void {
        const para = this.cElem('p');
        para.innerHTML = this.data.description;
        ref.append(para);
    }

    private createImage(ref: HTMLDivElement): void {
        if ('image' in this.data) {
            if (this.cardType === 'profile') {
                ref.append(new Avatar(this.data.image));
            } else {
                const img = this.cElem('img');
                img.src = `${this.data.image}`;
                img.alt = this.cardType;
                ref.append(img);
            }
        }
    }

    private createActions(ref: HTMLDivElement): void {
        if ('actions' in this.data) {
            for (const action of this.data.actions) {
                const btn = this.cElem('button');
                btn.type = action.type;
                btn.innerHTML = action.text;
                btn.onclick = () => action.cb(this.data);
                ref.append(btn);
            }
        }
    }
    private createCollpase(ref: HTMLDivElement): void {
        if ('collapsible' in this.data) ref.append(new Collapsible(this.data.collapsible));
    }

    private createPlainText(ref: HTMLDivElement, key: keyof Pick<(ICardConfig<'blog'> & ICardConfig<'product'>), 'author' | 'date' | 'price'>): void {
        if (key in this.data) {
            const span = this.cElem('span');
            span.innerHTML = `${(this.data as ICardConfig<'blog'> & ICardConfig<'product'>)[key]}`;
            ref.append(span);
        }
    }
    private createForm(ref: HTMLDivElement): void {
        if ('form' in this.data) ref.append(new Form(this.data.form.map, this.data.form.btns));
    }
}
import { ComponentData, ComponentDecorator } from '@decorators';
import { IRatingData } from './data';

import './rating.scss';

@ComponentDecorator
export class RatingComponent extends ComponentData<IRatingData> {

    constructor(protected data: IRatingData) {
        super(data);
    }

    protected init(): void {
        for (let i = 1; i <= this.data.max; i++) {
            const star = document.createElement('span');
            star.classList.add('star', i <= this.data.curr ? 'filled' : '');
            star.dataset.value = `${i}`;
            star.onclick = () => this.handleRating(i);
            this.appendChild(star);
        }
    }

    private handleRating(value: number): void {
        this.data.curr = value;
        this.updateStars();
    }

    private updateStars(): void {
        for (const star of this.clsElem('star')) {
            const value = +(star.dataset.value || '0');
            star.classList.toggle('filled', value <= this.data.curr);
        }
    }
}

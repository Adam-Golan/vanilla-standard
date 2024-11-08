import { ComponentDecorator, Page } from '@decorators';
import { addMeta } from '@decorators/utils/adders';

import './top.scss';

@ComponentDecorator
export class Top extends HTMLElement {
    constructor(ref: Page) {
        super();
        addMeta(this, 'component');
        this.innerHTML = '<span></span>';
        this.classList.add('titled');
        this.dataset.title = 'Page top';
        this.onclick = () => ref.scrollTo({ top: 0, behavior: 'smooth' });
        ref.addEventListener('scroll', () => {
            const method = ref.scrollTop > 200 ? 'add' : 'remove';
            this.classList[method]('visible');
        });
    }
}
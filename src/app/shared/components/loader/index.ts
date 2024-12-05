import { Component, ComponentDecorator } from '@decorators';

import './loader.scss';

@ComponentDecorator
export class Loader extends Component {

    protected init(): void {
        const img = document.createElement('img');
        img.style.background = `url(/loader/loader.svg) no-repeat 50%`;
        this.append(img);
    }
}
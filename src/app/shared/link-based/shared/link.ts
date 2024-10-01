import { ComponentBase, ComponentDecorator } from "@decorators";
import { ILink } from "../intefaces";

@ComponentDecorator
export class Link extends ComponentBase<ILink> {
    constructor(private navigate: (path: ILink) => void) {
        super();
    }
    protected init(): void {
        this.innerHTML = this.texts.text.replace(/\-/g, ' ');
        this.dataset.href = this.texts.href;
        this.onclick = () => { this.navigate(this.texts); this.classList.add('active'); }
        if (this.texts.title) this.title = this.texts.title;
        if (this.texts.img?.length) {
            const img = this.cElem('img');
            img.alt = this.texts.img.slice(this.texts.img.lastIndexOf('/') + 1);
            img.src = this.texts.img;
            this.append(img);
        }
    }
}
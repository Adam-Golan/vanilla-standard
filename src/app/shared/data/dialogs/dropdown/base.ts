import { ComponentData } from "@decorators";

import './dropdown.scss';

export abstract class BaseDropdown<T> extends ComponentData<T[]> {
    dialog = this.cElem('dialog');

    constructor(protected list: T[] = [], protected cb: (selected: T) => void) {
        super(list);
        this.classList.add('dropdown');
    }

    protected init(): void {
        this.append(this.dialog);
        this.renderList();
    }

    protected abstract createItem(data: T): HTMLElement;

    protected renderList(list: T[] = this.list): void {
        this.dialog.innerHTML = '';
        for (const data of list) {
            const item = this.createItem(data);
            if (!(data instanceof HTMLElement)) item.onclick = () => { this.cb(data); this.close(); }
            this.dialog.append(item);
        }
    }


    toggle(): void {
        this.dialog.open = !this.dialog.open;
    }

    open(): void {
        this.dialog.open = true;
    }

    close(): void {
        this.dialog.open = false;
    }
}
import { ComponentData, ComponentDecorator } from "@decorators";

import './code.scss';

abstract class Code extends ComponentData<string> {
    // Stringified code.
    constructor(protected code: string, protected preText?: string, protected postText?: string) {
        super(code);
    }

    protected copyCode(): void {
        const copyBtn = this.clsElem('titled')[0] as HTMLElement ?? this;
        navigator.clipboard.writeText(this.code)
            .then(_ => copyBtn.dataset.title = 'Copied!')
            .catch(_ => copyBtn.dataset.title = 'Failed!')
            .finally(() => setTimeout(() => copyBtn.dataset.title = 'Copy', 1000));
    }
}

@ComponentDecorator
export class CodeChunk extends Code {
    protected init(): void {
        this.createHead();
        this.createCode();
    }

    private createCode(): void {
        const pre = this.cElem('pre');
        pre.innerText = this.code;
        pre.className = 'content';
        this.append(pre);
    }

    private createHead(): void {
        const div = this.cElem('div');
        div.className = 'head';
        div.innerText = 'code';
        div.append(this.createCopier());
        this.append(div);
    }

    private createCopier(): HTMLSpanElement {
        const span = this.cElem('span');
        span.className = 'titled';
        span.dataset.title = 'Copy';
        span.onclick = this.copyCode.bind(this);
        return span;
    }
}

@ComponentDecorator
export class CodeWord extends Code {
    protected init(): void {
        this.innerHTML = `${this.preText ? `${this.preText}: ` : ''}<samp>${this.code}</samp> ${this.postText ? `${this.postText}.` : ''}`;
        this.classList.add('titled');
        this.dataset.title = 'Copy';
        this.onclick = this.copyCode.bind(this);
    }
}
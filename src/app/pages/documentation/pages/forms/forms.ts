import { Page, PageDecorator } from "@decorators";
import { Header, Fluid, Table, Form, Top, CodeChunk, CodeWord } from "@app/shared";
import { texts } from "@i18n/en/lang";
import { IFormMap, IInputProps, ITextareaProps } from "@app/shared/data/forms/interfaces";
import { Section } from "@i18n/en/documentation/forms/interfaces";

import './forms.scss';

@PageDecorator
export class Forms extends Page<typeof texts.docs.forms> {
    fluid: Fluid;

    protected async init() {
        this.fluid = new Fluid();
        this.populateFluid();
        this.append(new Header(this.texts.HEADER), new Top(this), this.fluid);
        super.init();
        this.showPage('docs');
    }

    private populateFluid(): void {
        this.fluid.append(this.createIntro(), ...this.createSections());
    }

    private createIntro(): HTMLParagraphElement {
        const para = this.cElem('p');
        para.className = 'intro';
        para.innerHTML = `${this.texts.EXPLAIN.text}${this.texts.EXPLAIN.list.map(item => `<li><a href="#${item}">${item}</a></li>`).join('')}`;
        return para;
    }

    private createSections(): HTMLDivElement[] {
        return this.texts.SECTIONS.map(section => {
            const
                div = this.cElem('div'),
                header = this.cElem('h3'),
                content = this.cElem('p');
            div.id = section.title;
            div.className = 'field-section';
            header.innerHTML = section.title;
            content.append(new CodeWord(section.props, 'Type'), new Table(section.properties), this.createExample(section));
            div.append(header, content);
            return div;
        })
    }

    private createExample(section: Section<ITextareaProps>): HTMLDivElement {
        const
            container = this.cElem('div'),
            title = this.cElem('h4'),
            output = this.cElem('output');
        output.innerText = 'output:';
        title.innerText = 'example:'
        const map: IFormMap = {
            fields: {
                example: {
                    type: section.title as any,
                    props: { ...section.example as any, label: 'input' }
                }
            }
        };
        const form = new Form(map, []);
        if ((section.example as IInputProps)?.value) output.innerText = `output: ${(section.example as IInputProps).value}`;
        form.addEventListener('input', () => form.query[section.title] !== undefined ? output.innerText = `output: ${form.query[section.title]}` : 0);
        container.append(title, output, form, new CodeChunk(JSON.stringify(map, null, 2)));
        return container;
    }
}
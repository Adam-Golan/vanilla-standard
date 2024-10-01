import { texts } from '../../i18n/en/lang';

export class Language {
    texts = texts;

    getPageTexts(page: keyof typeof texts): any {
        return this.texts[page];
    }
}
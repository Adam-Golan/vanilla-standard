// Activate if no need in dynamic import.
// import { texts } from '../../i18n/en/lang';

export class Language {
    texts: any;

    getTexts(path: string): any {
        return path.includes('/') ? this.locateTexts(path.split('/')) : this.texts[path];
    }

    private locateTexts(paths: string[]): any {
        let ref = this.texts;
        for (const subPath of paths) ref = ref[subPath];
        return ref;
    }

    async importTexts(lang: string, subPath: string = ''): Promise<void> {
        // Deactivate if no need in dynamic import.
        const { texts } = await import(/* @vite-ignore */`../../i18n/${lang}/lang${subPath}`);
        this.texts = texts;
    }
}
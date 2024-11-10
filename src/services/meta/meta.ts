export interface IMetaTags {
    description: string;
    keywords?: string;
    author?: string;
}

export function setMetaTags(tags: IMetaTags) {
    const cElem = document.createElement;
    const head = document.head;
    const description = cElem('meta');
    description.name = 'description';
    description.content = tags.description;
    head.appendChild(description);

    if (tags.keywords) {
        const keywords = cElem('meta');
        keywords.name = 'keywords';
        keywords.content = tags.keywords;
        head.appendChild(keywords);
    }

    if (tags.author) {
        const author = cElem('meta');
        author.name = 'author';
        author.content = tags.author;
        head.appendChild(author);
    }
}
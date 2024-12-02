export interface IMetaTags {
    description: string;
    keywords?: string;
    author?: string;
}

/**
 * Sets the meta tags in the document head. The description meta tag is required,
 * the keywords and author meta tags are optional.
 *
 * @param {IMetaTags} tags - an object with description, keywords, and author properties.
 */
export function setMetaTags(tags: IMetaTags) {
    const cElem = document.createElement.bind(document);
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
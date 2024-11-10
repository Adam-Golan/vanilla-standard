export interface OGCard {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}

export function setOpenGraphTags({ title, description, imageUrl, url }: OGCard) {
    const cElem = document.createElement;
    const head = document.head;
    const ogTitle = cElem("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = title;
    head.appendChild(ogTitle);

    const ogDescription = cElem("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.content = description;
    head.appendChild(ogDescription);

    const ogImage = cElem("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.content = imageUrl;
    head.appendChild(ogImage);

    const ogUrl = cElem("meta");
    ogUrl.setAttribute("property", "og:url");
    ogUrl.content = url;
    head.appendChild(ogUrl);
}

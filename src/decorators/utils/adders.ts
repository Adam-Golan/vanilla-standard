export function addMeta(target: HTMLElement, cls: 'page' | 'module' | 'component') {
    // Create class for modules and components by constructor name.
    cls === 'page' ? target.id = target.constructor.name.toLowerCase() : target.classList.add(target.constructor.name.toLowerCase());
    // Setting data-type.
    target.dataset.type = cls;
}
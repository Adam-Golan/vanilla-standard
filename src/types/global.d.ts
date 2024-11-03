declare global {
    interface String {
        capitalize(): string;
        addSpaces(type: 'uppercase' | '-' | '_' | '/'): string;
    }

    interface Date {
        getTimeDiff(b: Date): IDateTimeDiff
    }
}

export { };
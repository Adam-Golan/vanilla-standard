declare global {
    interface String {
        capitalize(): string;
    }

    interface Date {
        getTimeDiff(b: Date): IDateTimeDiff
    }
}

export { };
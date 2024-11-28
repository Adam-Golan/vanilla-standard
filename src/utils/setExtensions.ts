Set.prototype.union = function <T>(set: Set<T>): Set<T> {
    return new Set([...this, ...set]);
};

Set.prototype.intersect = function <T>(set: Set<T>): Set<T> {
    return new Set([...this].filter((item) => set.has(item)));
};

Set.prototype.diff = function <T>(set: Set<T>): Set<T> {
    return new Set([...this].filter((item) => !set.has(item)));
};

Set.prototype.isSubset = function <T>(set: Set<T>): boolean {
    return [...this].every((item) => set.has(item));
};

Set.prototype.symmetricDiff = function <T>(set: Set<T>): Set<T> {
    return new Set([...this.diff(set), ...set.diff(this)]);
};

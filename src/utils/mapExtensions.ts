Map.prototype.invert = function <K, V>(): Map<V, K> {
    const inverted = new Map<V, K>();
    for (const [key, value] of this) inverted.set(value, key);
    return inverted;
};

Map.prototype.filter = function <K, V>(cb: (value: V, key: K, map: Map<K, V>) => boolean): Map<K, V> {
    const filtered = new Map<K, V>();
    for (const [key, value] of this) if (cb(value, key, this)) filtered.set(key, value);
    return filtered;
};

Map.prototype.setMap = function <K, V>(keys: K[], values: V[]): Map<K, V> {
    if (!Array.isArray(keys) || !Array.isArray(values)) throw new TypeError('Both keys and values must be arrays.');
    if (keys.length !== values.length) throw new Error('Keys and values arrays must have the same length.');
    for (let idx = 0; idx < keys.length; idx++) this.set(keys[idx], values[idx]);
    return this;
}

Map.prototype.changeKeys = function <K, V>(cb: (key: K, value: V, map: Map<K, V>) => K): Map<K, V> {
    const newMap = new Map<K, V>();
    for (const [key, value] of this) newMap.set(cb(key, value, this), value);
    return newMap;
};

Map.prototype.changeValues = function <K, V>(cb: (key: K, value: V, map: Map<K, V>) => V): Map<K, V> {
    const newMap = new Map<K, V>();
    for (const [key, value] of this) newMap.set(key, cb(value, key, this));
    return newMap;
};

Map.prototype.toObject = function <K extends string | number | symbol, V>(this: Map<K, V>): Record<K, V> {
    const obj = {} as Record<K, V>;
    for (const [key, value] of this) obj[key] = value;
    return obj;
};

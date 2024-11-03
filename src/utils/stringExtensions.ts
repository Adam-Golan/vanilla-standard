String.prototype.capitalize = function (): string {
    let result = '';
    let capitalize = true;
    for (let i = 0; i < this.length; i++) {
        const char = this[i];
        if (char === ' ') {
            capitalize = true;
            result += char;
        } else if (capitalize) {
            result += char.toUpperCase();
            capitalize = false;
        } else result += char.toLowerCase();
    }
    return result;
};

String.prototype.addSpaces = function (type: 'uppercase' | '-' | '_' | '/'): string {
    // Fast path for empty strings
    if (!this.length) return '';
    // Separator case
    if (type !== 'uppercase') return this.split(type).join(' ');
    // Uppercase...case
    let result = this[0];
    for (let i = 1; i < this.length; i++) {
        const char = this[i];
        result += (char >= 'A' && char <= 'Z') ? ` ${char}` : char;
    }
    return result;
};
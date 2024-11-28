String.prototype.titleCase = function (): string {
    return this.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
};

String.prototype.capitalize = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
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

String.prototype.remove = function (substr: RegExp | string): string {
    const regex = new RegExp(substr, 'g');
    return this.replace(regex, '');
}

String.prototype.snakeCase = function (): string {
    return this.replace(/\W+/g, '_')
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase();
};
String.prototype.kebabCase = function (): string {
    return this.replace(/\W+/g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
};

String.prototype.reverse = function (): string {
    return this.split('').reverse().join('');
};

String.prototype.isPalindrome = function (): boolean {
    const cleaned = this.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.reverse();
};

String.prototype.count = function (substr: string): number {
    return (this.match(new RegExp(substr, 'g')) || []).length;
};

String.prototype.truncate = function (len: number): string {
    return this.length > len ? `${this.slice(0, len - 3)}...` : `${this}`;
};

String.prototype.superTrim = function (): string {
    return this.trim().replace(/\s+/g, ' ');
};

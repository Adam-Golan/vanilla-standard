Number.prototype.isEven = function (): boolean {
    return +this % 2 === 0;
};

Number.prototype.isOdd = function (): boolean {
    return +this % 2 !== 0;
};

Number.prototype.clamp = function (min: number, max: number): number {
    return Math.min(Math.max(+this, min), max);
};

Number.prototype.toOrdinal = function (): string {
    const n = this.valueOf();
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return `${n}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]}`;
};

Number.prototype.isPrime = function (): boolean {
    const n = this.valueOf();
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
};

Number.prototype.factorial = function (): number {
    const n = this.valueOf();
    if (n < 0) return NaN;
    return n === 0 ? 1 : n * (n - 1).factorial();
};

Number.prototype.toRoman = function (): string | null {
    const n = this.valueOf();
    if (n <= 0 || n >= 4000) return null;
    const map: [string, number][] = [
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1],
    ];
    let result = '';
    let num = n;
    for (const [letter, value] of map) {
        while (num >= value) {
            result += letter;
            num -= value;
        }
    }
    return result;
};

Number.prototype.toCurrency = function (locale: string = 'en-US', currency: string = 'USD'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(+this);
};

Number.prototype.roundToNearest = function (multiple: number): number {
    return Math.round(+this / multiple) * multiple;
};

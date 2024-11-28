BigInt.prototype.factorial = function (): bigint {
    if (+this < 0n) throw new RangeError('Factorial is not defined for negative numbers');
    let result = 1n;
    for (let i = 2n; i <= +this; i++) result *= i;
    return result;
};

BigInt.prototype.isPrime = function (this: bigint): boolean {
    if (this < 2n) return false;
    if (this === 2n || this === 3n) return true;
    if (this % 2n === 0n || this % 3n === 0n) return false;
    
    let i = 5n;
    const limit = BigInt(Math.floor(Number(this) ** 0.5)); // Cast to number and then back to BigInt for exponentiation
    while (i <= limit) {
        if (this % i === 0n || this % (i + 2n) === 0n) return false;
        i += 6n;
    }
    return true;
};


BigInt.prototype.toDecimalString = function (): string {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

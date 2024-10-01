String.prototype.capitalize = function (): string {
    let finStr = this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    const spaces = [];
    for (let idx = 0; idx < finStr.length; idx++) if (finStr[idx] === ' ') spaces.push(idx + 1);
    for (const idx of spaces) finStr = finStr.slice(0, idx) + finStr.charAt(idx).toUpperCase() + finStr.slice(idx + 1);
    return finStr;
};
String.prototype.capitalize = function (): string {
    // Convert the string to an array of characters for efficient manipulation
    const chars = this.toLowerCase().trim().split('');
    // Capitalize the first character
    chars[0] = chars[0].toUpperCase();

    // Iterate through the characters and capitalize after each space
    if (chars.includes(' '))
        for (const [i, _] of chars.entries())
            if (chars[i - 1] === ' ') chars[i] = chars[i].toUpperCase();

    // Join the characters back into a string
    return chars.join('');
};
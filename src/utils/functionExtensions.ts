// Function always starts with Fun!
Function.prototype.debounce = function (delay: number): (...args: any[]) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    const func = this;
    const returnFn = (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(returnFn, args), delay);
    }
    return returnFn;
};

Function.prototype.throttle = function (delay: number): (...args: any[]) => void {
    let lastCall = 0;
    const func = this;
    const returnFn = (...args: any[]) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(returnFn, args);
        }
    };
    return returnFn;
};

Function.prototype.once = function (): (...args: any[]) => any {
    let called = false;
    const func = this;

    const returnFn = (...args: any[])  => {
        if (!called) {
            called = true;
            return func.apply(returnFn, args);
        }
    };
    return returnFn;
};
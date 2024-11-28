RegExp.prototype.testAsync = function (str: string): Promise<boolean> {
    return new Promise(res => res(this.test(str)));
};


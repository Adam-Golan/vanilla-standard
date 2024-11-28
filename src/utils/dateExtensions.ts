interface IDateTimeDiff {
    timeDiff: number;
    seconds: number;
    minutes: number;
    hours: number;
    duration: string;
}
Date.prototype.getTimeDiff = function (date: Date): IDateTimeDiff {
    const timeDiff = Math.floor((this.getTime() - date.getTime()) / 1000);
    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return { timeDiff, seconds, minutes, hours, duration };
};

Date.prototype.isLeapYear = function (): boolean {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

Date.prototype.add = function (type: 'y' | 'm' | 'd', value: number): Date {
    const result = new Date(this);
    const key = type === 'y' ? 'FullYear' : type === 'm' ? 'Month' : 'Date';
    result[`set${key}`](result[`get${key}`]() + value);
    return result;
}

Date.prototype.subtract = function (type: 'y' | 'm' | 'd', value: number): Date {
    return this.add(type, -value);
};

Date.prototype.isSameDay = function (date: Date): boolean {
    return (
        this.getFullYear() === date.getFullYear() &&
        this.getMonth() === date.getMonth() &&
        this.getDate() === date.getDate()
    );
};

Date.prototype.daysBetween = function (date: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor(Math.abs(this.getTime() - date.getTime()) / msPerDay);
};

Date.prototype.toISODateString = function (): string {
    return this.toISOString().split('T')[0];
};

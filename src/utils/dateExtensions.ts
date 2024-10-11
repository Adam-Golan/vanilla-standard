interface IDateTimeDiff {
    timeDiff: number;
    seconds: number;
    minutes: number;
    hours: number;
    duration: string;
}
Date.prototype.getTimeDiff = function (b: Date): IDateTimeDiff {
    const timeDiff = Math.round((this.getTime() - b.getTime()) / 1000);
    const seconds = timeDiff % 60;
    const minutes = timeDiff > 60 ? Math.floor(timeDiff / 60) : 0;
    const hours = timeDiff > 3600 ? Math.floor(timeDiff / 3600) : 0;
    const duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    return { timeDiff, seconds, minutes, hours, duration }
};


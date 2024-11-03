interface IDateTimeDiff {
    timeDiff: number;
    seconds: number;
    minutes: number;
    hours: number;
    duration: string;
}
Date.prototype.getTimeDiff = function(b: Date): IDateTimeDiff {
    const timeDiff = Math.floor((this.getTime() - b.getTime()) / 1000);
    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return { timeDiff, seconds, minutes, hours, duration };
};


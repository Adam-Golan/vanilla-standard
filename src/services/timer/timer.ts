import { ElapsedTime } from './interfaces';

export class Timer {
    private startTime: Date;
    private endTime: Date;

    reset(): void {
        this.startTime = this.endTime = new Date(0);
    }

    startClock(): void {
        !this.startTime?.valueOf()
            ? this.startTime = new Date()
            : console.log('Timer already started!');
    }

    stopClock(): void {
        !this.endTime?.valueOf()
            ? this.endTime = new Date()
            : console.log('Timer already ended!');
    }

    getElapsedTime(): ElapsedTime {
        if (!this.endTime?.valueOf()) this.stopClock();
        const {duration} = this.endTime.getTimeDiff(this.startTime)
        setTimeout(()=> this.reset());
        return {
            start: {
                h: this.getTime('start', 'Hours'),
                m: this.getTime('start', 'Minutes'),
                s: this.getTime('start', 'Seconds'),
            },
            end: {
                h: this.getTime('end', 'Hours'),
                m: this.getTime('end', 'Minutes'),
                s: this.getTime('end', 'Seconds'),
            },
            duration
        }
    }

    private getTime(dType: 'start' | 'end', tType: 'Hours' | 'Minutes' | 'Seconds'): number {
        return this[`${dType}Time`][`get${tType}`]();
    }
}
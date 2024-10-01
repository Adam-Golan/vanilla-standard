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
        const timeDiff: any = Math.round((this.endTime.getTime() - this.startTime.getTime()) / 1000);
        const seconds = timeDiff % 60;
        const minutes = timeDiff > 60 ? Math.floor(timeDiff / 60) : 0;
        const hours = timeDiff > 3600 ? Math.floor(timeDiff / 3600) : 0;
        const duration = `${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
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

    private addZero(n: number): string {
        return n > 9 ? '' : '0';
    }

    private getTime(dType: 'start' | 'end', tType: 'Hours' | 'Minutes' | 'Seconds'): number {
        return this[`${dType}Time`][`get${tType}`]();
    }
}
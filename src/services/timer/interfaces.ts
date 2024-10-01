export interface TimeDestructure {
    h: number;
    m: number;
    s: number;
}

export interface ElapsedTime {
    duration: string;
    start: TimeDestructure;
    end: TimeDestructure;
}
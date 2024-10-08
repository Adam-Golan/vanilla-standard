export interface ITableConfig {
    columns: string[];
    rows: { field: string; data: string | number }[][];
}
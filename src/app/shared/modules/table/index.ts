import { Module, ModuleDecorator } from "@decorators";
import { ITableConfig } from "./interfaces";
import { Row } from "./row/row";

import './table.scss';

@ModuleDecorator
export class Table extends Module<ITableConfig> {
    constructor(protected data: ITableConfig) {
        super(data);
        this.append(new Row(this.data.columns, 'head'), ...this.createRows());
    }

    // Noop.
    protected init(): void { }

    private createRows(): Row[] {
        return this.data.rows.map(row => {
            const arr = new Array(this.data.columns.length);
            for (const cell of row) arr[this.data.columns.indexOf(cell.field)] = cell.data;
            return new Row(arr);
        });
    }
}
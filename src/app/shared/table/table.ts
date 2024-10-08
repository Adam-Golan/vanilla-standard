import { ModuleBase, ModuleDecorator } from "@decorators";
import { ITableConfig } from "./interfaces";

import './table.scss';
import { Row } from "./row/row";

@ModuleDecorator
export class Table extends ModuleBase {
    constructor(private pkg: ITableConfig) {
        super();
    }

    protected init(): void {
        this.append(new Row(this.pkg.columns, 'head'), ...this.createRows());
    }

    private createRows(): Row[] {
        return this.pkg.rows.map(row => {
            const arr = new Array(this.pkg.columns.length);
            for (const cell of row) arr[this.pkg.columns.indexOf(cell.field)] = cell.data;
            return new Row(arr);
        });
    }
}
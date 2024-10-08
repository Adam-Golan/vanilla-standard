import { ComponentBase, ComponentDecorator } from "@decorators";
import { IRowData } from "./interfaces";

@ComponentDecorator
export class Row extends ComponentBase {
    constructor(private rowData: IRowData, private type: 'head' | 'body' = 'body') {
        super();
    }

    protected init(): void {
        this.classList.add(this.type);
        for (const cellData of this.rowData) {
            const cell = this.cElem('div');
            cell.className = 'cell';
            cell.innerHTML = cellData.toString();
            this.append(cell);
        }
    }
}
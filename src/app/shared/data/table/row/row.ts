import { ComponentData, ComponentDecorator } from "@decorators";
import { IRowData } from "./interfaces";

@ComponentDecorator
export class Row extends ComponentData {
    constructor(protected data: IRowData, private type: 'head' | 'body' = 'body') {
        super(data);
    }

    protected init(): void {
        this.classList.add(this.type);
        for (const cellData of this.data) {
            const cell = this.cElem('div');
            cell.className = 'cell';
            cell.innerHTML = cellData.toString();
            this.append(cell);
        }
    }
}
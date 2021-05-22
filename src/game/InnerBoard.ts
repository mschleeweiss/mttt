import { Board } from './Board';
import { Cell } from './Cell'
import { Coordinates } from './Coordinates';

export class InnerBoard extends Board {

    constructor() {
        super();
        for (let rowIdx = Coordinates.MIN_VALUE; rowIdx <= Coordinates.MAX_VALUE; ++rowIdx) {
            this.fields[rowIdx] = [];
            for (let colIdx = Coordinates.MIN_VALUE; colIdx <= Coordinates.MAX_VALUE; ++colIdx) {
                this.fields[rowIdx][colIdx] = new Cell();
            }
        }
    }

    public getCell(row: number, col: number): Cell {
        if (Coordinates.MIN_VALUE <= row && row <= Coordinates.MAX_VALUE) {
            if (Coordinates.MIN_VALUE <= col && col <= Coordinates.MAX_VALUE) {
                return this.fields[row][col] as Cell;
            }
        }
        throw new Error("Invalid cell coordinates");
    }

    public activate(): void {
        this.getFieldsFlat().forEach((cell: Cell) => {
            cell.active = true;
        });
    }

    public deactivate(): void {
        this.getFieldsFlat().forEach((cell: Cell) => {
            cell.active = false;
        })
    }
}

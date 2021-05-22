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

    public calculateWinningState(coordinates: Coordinates): void {
        // const row = coordinates.innerRow;
        // const col = coordinates.innerCol;

        // const relevantCells = [
        //     this.getRowCells(row),
        //     this.getColCells(col)
        // ];
        // if ((row + col) % 2 === 0) {
        //     relevantCells.push(this.getDiagonalCells());
        //     relevantCells.push(this.getAntidiagonalCells());
        // }

        // const hasWinner = relevantCells.some((cells: Cell[]) => this.haveCellsWinner(cells));
        // if (hasWinner) {
        //     this.conquerer = this.fields[row][col].conquerer;
        //     return;
        // }

        // this.draw = this.getCells()
        //     .map(this.getCellConquerer)
        //     .every((type: PlayerType) => type !== PlayerType.NONE)
    }

    // private haveCellsWinner(cells: Cell[]): boolean {
    //     return cells
    //         .map(this.getCellConquerer)
    //         .every(this.checkIfTypesAreTheSame);
    // }



    // private getCellConquerer(cell: Cell): PlayerType {
    //     return cell.conquerer;
    // }

    // private checkIfTypesAreTheSame(type: PlayerType, index: number, cellTypes: PlayerType[]): boolean {
    //     return type === cellTypes[0];
    // }
}
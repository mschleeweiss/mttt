import { Board } from './FieldMatrix';
import { Cell } from './Cell';
import { Coordinates } from './Coordinates';
import { InnerBoard } from './InnerBoard'

export class OuterBoard extends Board {

    constructor() {
        super();
        for (let rowIdx = Coordinates.MIN_VALUE; rowIdx <= Coordinates.MAX_VALUE; ++rowIdx) {
            this.fields[rowIdx] = [];
            for (let colIdx = Coordinates.MIN_VALUE; colIdx <= Coordinates.MAX_VALUE; ++colIdx) {
                this.fields[rowIdx][colIdx] = new InnerBoard();
            }
        }
    }

    getBoard(coordinates: Coordinates): InnerBoard {
        return this.fields[coordinates.outerRow][coordinates.outerCol] as InnerBoard;
    }

    getCell(coordinates: Coordinates): Cell {
        const board = this.getBoard(coordinates);
        return board.getCell(coordinates.innerRow, coordinates.innerCol);
    }
}
import { Cell } from './Cell'
import { PlayerType } from './PlayerType'

const MAX_LEN = 3;

export class Board {
    winner: PlayerType;
    draw: boolean;
    cells: Cell[][]

    constructor() {
        this.cells = [];
        for (let i = 0; i < MAX_LEN; ++i) {
            this.cells[i] = [];
            for (let j = 0; j < MAX_LEN; ++j) {
                this.cells[i][j] = new Cell();
            }
        }
    }

    public getCell(i: number, j: number): Cell {
        if (0 <= i && i < MAX_LEN) {
            if (0 <= j && j < MAX_LEN) {
                return this.cells[i][j];
            }
        }
        throw new Error("Invalid cell coordinates");
    }

    public activate(): void {
        this.getCells().forEach((cell: Cell) => {
            cell.active = true;
        });
    }

    public deactivate(): void {
        this.getCells().forEach((cell: Cell) => {
            cell.active = false;
        })
    }

    private getCells(): Cell[] {
        return ([] as Cell[]).concat(...this.cells);
    }
}
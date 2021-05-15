import { Cell } from './Cell'
import { PlayerType } from './PlayerType'


export class Board {
    winner: PlayerType;
    draw: boolean;
    cells: Cell[][]

    constructor() {
        this.cells = [];
        for (let i = 0; i < 3; ++i) {
            this.cells[i] = [];
            for (let j = 0; j < 3; ++j) {
                this.cells[i][j] = new Cell();
            }
        }
    }
}
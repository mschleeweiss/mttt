import { Board } from './Board'
import { PlayerType } from './PlayerType'

const MAX_LEN = 3;

export class MetaBoard {
    winner: PlayerType;
    draw: boolean;
    boards: Board[][]

    constructor() {
        this.boards = [];
        for (let i = 0; i < 3; ++i) {
            this.boards[i] = [];
            for (let j = 0; j < 3; ++j) {
                this.boards[i][j] = new Board();
            }
        }
    }

    getCell(i: number, j: number, k: number, l: number) {
        if (0 <= i && i < MAX_LEN) {
            if (0 <= j && j < MAX_LEN) {
                return this.boards[i][j].getCell(k, l);
            }
        }
    }
}
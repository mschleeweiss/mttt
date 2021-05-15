import { Board } from './Board'
import { PlayerType } from './PlayerType'

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

    toString () : string {
        return "Foo";
    }
}
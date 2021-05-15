import { MetaBoard } from './MetaBoard'
import { Player } from './Player'


export class Game {
    readonly lobby: boolean;
    readonly finished: boolean;
    readonly players: Player[];
    readonly board: MetaBoard;

    constructor(admin: Player) {
        this.lobby = true;
        this.finished = false;
        this.players = [admin];
        this.board = new MetaBoard();
    }
}
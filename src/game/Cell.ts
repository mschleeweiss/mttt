import { IWinnable } from './IWinnable';
import { PlayerType } from './PlayerType'

export class Cell implements IWinnable {
    winner: PlayerType;
    active: boolean;

    constructor() {
        this.winner = PlayerType.NONE;
        this.active = false;
    }
}
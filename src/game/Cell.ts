import { PlayerType } from './PlayerType'

export class Cell {
    player: PlayerType;
    active: boolean;

    constructor() {
        this.player = PlayerType.NONE;
        this.active = false;
    }
}
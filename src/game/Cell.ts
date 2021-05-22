import { IConquerable } from './IConquerable';
import { PlayerType } from './PlayerType'

export class Cell implements IConquerable {
    conquerer: PlayerType;
    active: boolean;

    constructor() {
        this.conquerer = PlayerType.NONE;
        this.active = false;
    }
}
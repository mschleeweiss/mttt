import { IWinnable } from './IWinnable';
import { Move } from './Move';
import { PlayerType } from './PlayerType';

export class TimeLimitHandler {
  startTime: Date;
  moves: Move[];

  constructor() {
      this.startTime = new Date();
  }
}

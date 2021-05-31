import { Move } from './Move';
import { TimeLimit } from './TimeLimit';

export class TimeLimitHandler {
    startTime: Date;
    moves: Move[];
    limitX: TimeLimit;
    limitO: TimeLimit;
    private timestamps: Date[];

    constructor(moves: Move[], limitX: TimeLimit, limitO: TimeLimit) {
        this.startTime = new Date();
        this.limitX = limitX;
        this.limitO = limitO;
        this.moves = moves;
    }

    update() {

    }
}

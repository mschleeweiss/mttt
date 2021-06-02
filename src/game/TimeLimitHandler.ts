import { Move } from './Move';
import { PlayerType } from './PlayerType';
import { TimeLimit } from './TimeLimit';

export class TimeLimitHandler {
    startTime: Date;
    moves: Move[];
    limits: Map<PlayerType, TimeLimit>;
    private timestamps: Date[];
    private timeout: NodeJS.Timeout;

    constructor(moves: Move[], limitX: TimeLimit, limitO: TimeLimit) {
        this.startTime = new Date();
        this.limits = new Map([
            [PlayerType.X, limitX],
            [PlayerType.O, limitO]
        ]);
        this.moves = moves;
        this.timestamps = [this.startTime];

        this.createTimeout();
    }

    public update() {
        this.timestamps.push(this.moves[this.moves.length].timestamp);
        const teamLimit = this.limits.get(this.determineTeamWhichMadeTheLastMove());
        const turnDurationInSeconds = this.calcLatestMoveDurationInSeconds();
        teamLimit.decrementBy(turnDurationInSeconds);
        this.createTimeout();
    }

    private calcLatestMoveDurationInSeconds(): number {
        const latestTimestamps = this.getLastTwoTimestamps();
        const latestTimes = latestTimestamps.map((ts: Date) => ts.getTime());
        const durationInMilliseconds = latestTimes[1] - latestTimes[0];
        return durationInMilliseconds / 1000;
    }

    private getLastTwoTimestamps(): Date[] {
        return [
            this.timestamps[this.timestamps.length - 2],
            this.timestamps[this.timestamps.length - 1],
        ];
    }

    private determineTeamWhichMadeTheLastMove() {
        const isEvenMoveNumber = this.moves.length % 2 === 0;
        return isEvenMoveNumber ? PlayerType.O : PlayerType.X;
    }

    private determineTeamWhichMakesTheNextMove() {
        const isEvenMoveNumber = this.moves.length % 2 === 0;
        return isEvenMoveNumber ? PlayerType.X : PlayerType.O;
    }

    private createTimeout() {
        const nextTeam = this.determineTeamWhichMakesTheNextMove();
        const teamLimit = this.limits.get(nextTeam);

        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        this.timeout = setTimeout(() => {
            teamLimit.decrementBy(teamLimit.durationInSeconds);
        }, teamLimit.durationInSeconds * 1000);
    }
}

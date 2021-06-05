import { Move } from './Move';
import { PlayerType } from './PlayerType';
import { Settings } from './Settings';
import { TimeLimit } from './TimeLimit';

export class TimeLimitHandler {
    private state: HandlerState;

    constructor(moves: Move[], limitX: TimeLimit, limitO: TimeLimit, settings: Settings) {
        if (settings.timerActive) {
            this.state = new ActiveHandler(settings, moves, new Map([
                [PlayerType.X, limitX],
                [PlayerType.O, limitO]
            ]))
        } else {
            this.state = new InactiveHandler();
        }
    }

    public update() {
        this.state.update()
    }
}

interface HandlerState {
    settings: Settings;
    startTime: Date;
    moves: Move[];
    limits: Map<PlayerType, TimeLimit>;
    
    update(): void
}

class InactiveHandler implements HandlerState {

    limits: Map<PlayerType, TimeLimit>;
    moves: Move[];
    settings: Settings;
    startTime: Date = new Date();

    update(): void {}

}

class ActiveHandler implements HandlerState {

    limits: Map<PlayerType, TimeLimit>;
    moves: Move[];
    settings: Settings;
    startTime: Date = new Date();

    private timestamps: Date[];
    private timeout: NodeJS.Timeout;


    constructor(settings: Settings, moves: Move[], limits: Map<PlayerType, TimeLimit>) {
        this.settings = settings;
        this.startTime = new Date();
        this.limits = limits
        this.moves = moves;
        this.timestamps = [this.startTime];

        this.createTimeout();
    }

    update() {
        this.timestamps.push(this.moves[this.moves.length - 1].timestamp);
        const teamLimit = this.limits.get(this.determineTeamWhichMadeTheLastMove());
        const turnDurationInSeconds = this.calcLatestMoveDurationInSeconds();
        teamLimit.decrementBy(turnDurationInSeconds);
        // each turn add a few seconds - fischer system
        teamLimit.incrementBy(this.settings.timeLimitInMinutes * 2);
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

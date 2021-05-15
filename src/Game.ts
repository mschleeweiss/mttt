import { MetaBoard } from './MetaBoard'
import { Player } from './Player'
import { Settings } from './Settings'

export class Game {
    readonly admin: string;
    readonly lobby: boolean;
    readonly finished: boolean;
    readonly players: Player[];
    readonly teamX: Player[];
    readonly teamO: Player[];
    readonly board: MetaBoard;
    readonly settings: Settings;
    readonly id: string;

    constructor(admin: string) {
        this.id = this.generateId(4);
        this.lobby = true;
        this.finished = false;
        this.board = new MetaBoard();
        this.settings = new Settings(0);
    }

    addPlayer(player: Player) {
        if (!this.players.includes(player)) {
            this.players.push(player);
        }
    }

    joinTeamX(player: Player) {
        if (this.players.includes(player)) {
            const oldTeamIdx = this.teamO.indexOf(player);
            if (oldTeamIdx > 0) {
                this.teamO.splice(oldTeamIdx, 1);
            }
            if (!this.teamX.includes(player)) {
                this.teamX.push(player);
            }
        }
    }

    joinTeamO(player: Player) {
        if (this.players.includes(player)) {
            const oldTeamIdx = this.teamX.indexOf(player);
            if (oldTeamIdx > 0) {
                this.teamX.splice(oldTeamIdx, 1);
            }
            if (!this.teamO.includes(player)) {
                this.teamO.push(player);
            }
        }
    }

    private generateId(length: number): string {
        const result = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                characters.length)));
        }
        return result.join('');
    }
}
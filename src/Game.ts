import { MetaBoard } from './MetaBoard'
import { Player } from './Player'
import { PlayerType } from './PlayerType'
import { Settings } from './Settings'

export class Game {
    readonly id: string;
    readonly timestamp: Date;
    private admin: string;

    private startable: boolean;
    private active: boolean;
    private over: boolean;

    readonly settings: Settings;

    readonly board: MetaBoard;
    private readonly players: Player[];
    readonly teams: Object;

    constructor(admin: string) {
        this.id = this.generateId(4);
        this.timestamp = new Date();
        this.admin = admin;
        this.startable = false;
        this.active = false;
        this.over = false;
        this.settings = new Settings(0);
        this.board = new MetaBoard();
        this.players = [];
        this.teams = {
            [PlayerType.X]: [],
            [PlayerType.O]: []
        }
    }

    public addPlayer(player: Player) {
        if (!this.players.includes(player)) {
            this.players.push(player);
        }

        this.updateGameStartable()
    }

    public removePlayer(id: string) {
        const player = this.players.find(p => p.id === id);

        const teamXList = this.teams[PlayerType.X];
        const teamXIdx = teamXList.indexOf(player);
        if (teamXIdx > -1) {
            teamXList.splice(teamXIdx, 1);
        }

        const teamOList = this.teams[PlayerType.O];
        const teamOIdx = teamOList.indexOf(player);
        if (teamOIdx > -1) {
            teamOList.splice(teamOIdx, 1);
        }

        const playerIdx = this.players.indexOf(player);
        if (playerIdx > -1) {
            this.players.splice(playerIdx, 1);
        }

        if (this.admin === id) {
            if (this.players.length > 0) {
                const newAdmin = this.players[0];
                this.admin = newAdmin.id;
            }
        }

        this.updateGameStartable();
    }

    public containsPlayer(id: string) {
        return this.players.some(p => p.id === id);
    }

    public joinTeam(id: string, team: PlayerType) {
        const player = this.players.find(p => p.id === id);
        const teamList = this.teams[team];
        const otherTeam = team === PlayerType.X ? PlayerType.O : PlayerType.X;
        const otherTeamList = this.teams[otherTeam];
        
        if (this.players.includes(player)) {
            console.log("good");
            const oldTeamIdx = otherTeamList.indexOf(player);
            if (oldTeamIdx >= 0) {
                otherTeamList.splice(oldTeamIdx, 1);
            }
            if (!teamList.includes(player)) {
                teamList.push(player);
            }
        }

        this.updateGameStartable();
    }

    private updateGameStartable(): void {
        this.startable = this.isGameStartable();
    }

    private isGameStartable(): boolean {
        const playerCountX = this.teams[PlayerType.X].length;
        const playerCountO = this.teams[PlayerType.O].length 
        if (playerCountX === 0 || playerCountO === 0) {
            return false;
        }

        if (this.players.length !== playerCountX + playerCountO) {
            return false;
        }

        return true;
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
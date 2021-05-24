import { OuterBoard } from './OuterBoard'
import { Move } from './Move';
import { Player } from './Player'
import { PlayerType } from './PlayerType'
import { Settings } from './Settings'
import { Board } from './Board';
import { IWinnable } from './IWinnable';
import { Cell } from './Cell';
import { Coordinates } from './Coordinates';

const getWinner = (field: IWinnable) => field.winner;
const hasWinner = (winner: PlayerType) => winner !== PlayerType.NONE;
const isWinnerTheSame = (
    winner: PlayerType,
    index: number,
    winners: PlayerType[]
): boolean => winner === winners[0] && winner !== PlayerType.NONE;
const isBoardPlayable = (board: Board) => board.winner === PlayerType.NONE && !board.draw;

export class Game {
    readonly id: string;
    readonly timestamp: Date;
    admin: Player;

    private startable: boolean;
    active: boolean;
    private over: boolean;

    readonly settings: Settings;

    readonly outerBoard: OuterBoard;
    private readonly players: Player[];
    readonly teams: Object;
    private moves: Move[];
    private currentPlayer: Player;

    constructor(admin: Player) {
        this.id = this.generateId(4);
        this.timestamp = new Date();
        this.admin = admin;
        this.startable = false;
        this.active = false;
        this.over = false;
        this.settings = new Settings(0);
        this.outerBoard = new OuterBoard();
        this.players = [];
        this.moves = [];
        this.teams = new Map();
        this.teams = {
            [PlayerType.X]: [],
            [PlayerType.O]: []
        };
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

        if (this.admin.id === id) {
            if (this.players.length > 0) {
                this.admin = this.players[0];
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

    public startGame(): void {
        if (this.startable) {
            this.active = true;
            this.enableAllFields();
            this.determineCurrentPlayer();
        }
    }

    public makeMove(move: Move): void {
        if (this.isMoveValid(move)) {
            const currentPlayerInTeamX = this.teams[PlayerType.X].includes(this.currentPlayer);
            const playerType = currentPlayerInTeamX ? PlayerType.X : PlayerType.O;

            const cell = this.outerBoard.getCell(move.coordinates);
            cell.winner = playerType;
            this.updateState(move);
        }
    }

    private updateState(move: Move) {
        this.moves.push(move);
        const lastChangedBoard = this.outerBoard.getBoard(move.coordinates);
        this.updateBoardState(move.coordinates.innerRow, move.coordinates.innerCol, lastChangedBoard);
        this.updateBoardState(move.coordinates.outerRow, move.coordinates.outerCol, this.outerBoard);
        this.updateGameState(move);
    }

    private updateGameState(move: Move) {
        this.disableAllFields();
        if (this.outerBoard.winner !== PlayerType.NONE) {
            this.active = false;
            this.over = true;
            return;
        }
        this.enableFields(move.coordinates.innerRow, move.coordinates.innerCol);
        this.determineCurrentPlayer();
    }

    private enableFields(row: number, col: number) {
        const targetBoard = this.outerBoard.getBoard(new Coordinates(row, col));
        if (isBoardPlayable(targetBoard)) {
            targetBoard.getFieldsFlat().forEach((cell: Cell) => {
                cell.active = true;
            });
            return;
        }
        this.outerBoard.getFieldsFlat()
            .filter(isBoardPlayable)
            .forEach((board: Board) => {
                board.getFieldsFlat().forEach((cell: Cell) => {
                    cell.active = true;
                });
            });
    }

    private enableAllFields() {
        this.outerBoard.getFieldsFlat().forEach((board: Board) => {
            board.getFieldsFlat().forEach((cell: Cell) => {
                cell.active = true;
            });
        });
    }

    private disableAllFields() {
        this.outerBoard.getFieldsFlat().forEach((board: Board) => {
            board.getFieldsFlat().forEach((cell: Cell) => {
                cell.active = false;
            });
        });
    }

    private determineCurrentPlayer() {
        const moveCount = this.moves.length;
        const currentTeam = moveCount % 2 ? PlayerType.O : PlayerType.X;
        const teamList = this.teams[currentTeam];
        const memberCount = teamList.length;
        const movesPerTeam = Math.floor(moveCount / 2);
        const currentPlayerIdx = movesPerTeam % memberCount
        this.currentPlayer = teamList[currentPlayerIdx];
    }

    /**
     * 
     * @param row Row coordinate of the last changed field
     * @param col Col coordinate of the last changed field
     * @param board Board which was just changed where we want to determine a winner
     */
    private updateBoardState(row: number, col: number, board: Board) {
        const relevantFields = [
            board.getRowFields(row),
            board.getColFields(col)
        ];
        console.log(row, col)
        if (!((row + col) % 2)) {
            relevantFields.push(board.getDiagonalFields());
            relevantFields.push(board.getAntidiagonalFields());
        }

        console.log(relevantFields)
        console.log("-----------------")

        const boardHasWinner = relevantFields.some((fields: IWinnable[]) => {
            return fields
                .map(getWinner)
                .every(isWinnerTheSame);
        });

        if (boardHasWinner) {
            board.winner = board.fields[row][col].winner;
            return;
        }

        board.draw = board.getFieldsFlat().map(getWinner).every(hasWinner);
    }

    private isMoveValid(move: Move): boolean {
        if (this.active && move.player === this.currentPlayer) {
            const cell = this.outerBoard.getCell(move.coordinates);
            return cell.active && cell.winner === PlayerType.NONE;
        }
        return false;
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
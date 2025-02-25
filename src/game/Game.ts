import { OuterBoard } from './OuterBoard';
import { Move } from './Move';
import { Player } from './Player';
import { PlayerType } from './PlayerType';
import { Settings } from './Settings';
import { Board } from './Board';
import { IWinnable } from './IWinnable';
import { Cell } from './Cell';
import { Coordinates } from './Coordinates';
import { TimeLimitHandler } from './TimeLimitHandler';
import { Observer } from './ObserverPattern';
import { TimeLimit } from './TimeLimit';

const getWinner = (field: IWinnable) => field.winner;
const hasWinner = (winner: PlayerType) => winner !== PlayerType.NONE;
const isWinnerTheSame = (
  winner: PlayerType,
  index: number,
  winners: PlayerType[],
): boolean => winner === winners[0] && winner !== PlayerType.NONE;
const isBoardPlayable = (board: Board) =>
  board.winner === PlayerType.NONE && !board.draw;

export class Game implements Observer {
  admin: Player;
  readonly id: string = this.generateId(4);
  readonly timestamp: Date = new Date();

  private startable: boolean = false;
  active: boolean = false;
  over: boolean = false;

  readonly settings: Settings = new Settings();
  readonly outerBoard: OuterBoard = new OuterBoard();
  private readonly players: Player[] = [];
  readonly teams: Object = {
    [PlayerType.X]: [],
    [PlayerType.O]: [],
  };;
  private moves: Move[] = [];
  private currentPlayer: Player;
  private timeLimitHandler: TimeLimitHandler;
  private timeLimits: Object = {};

  constructor(admin: Player) {
    this.admin = admin;
  }

  update(event: String): void {
    if (event === "expired") {
      const limitX: TimeLimit = this.timeLimits[PlayerType.X];
      const winnerTeam = limitX.isExpired() ? PlayerType.O : PlayerType.X;
      this.outerBoard.winner = winnerTeam;
      this.updateGameState();
    }
  }

  public addPlayer(player: Player) {
    if (!this.players.includes(player)) {
      this.players.push(player);
    }

    this.updateGameStartable();
  }

  public removePlayer(id: string) {
    const player = this.players.find((p) => p.id === id);

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
    return this.players.some((p) => p.id === id);
  }

  public joinTeam(id: string, team: PlayerType) {
    const player = this.players.find((p) => p.id === id);
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
      const limitInSeconds = this.settings.timerActive ? this.settings.timeLimitInMinutes * 60 : Infinity;

      const limitX = new TimeLimit(limitInSeconds, PlayerType.X);
      const limitO = new TimeLimit(limitInSeconds, PlayerType.O);

      this.timeLimits[PlayerType.X] = limitX
      this.timeLimits[PlayerType.O] = limitO

      limitX.attach(this);
      limitO.attach(this);

      this.timeLimitHandler = new TimeLimitHandler(this.moves, limitX, limitO, this.settings)
      this.active = true;
      this.enableAllFields();
      this.determineCurrentPlayer();
    }
  }

  public makeMove(move: Move): void {
    if (this.isMoveValid(move)) {
      const currentPlayerInTeamX = this.teams[PlayerType.X].includes(
        this.currentPlayer,
      );
      const playerType = currentPlayerInTeamX ? PlayerType.X : PlayerType.O;

      const cell = this.outerBoard.getCell(move.coordinates);
      cell.winner = playerType;
      this.updateState(move);
    }
  }

  public getState(): Object {
    return {
      admin: this.admin,
      id: this.id,
      startable: this.startable,
      active: this.active,
      over: this.over,
      settings: this.settings,
      outerBoard: this.outerBoard,
      players: this.players,
      teams: this.teams,
      moves: this.moves,
      currentPlayer: this.currentPlayer,
      timeLimits: {
        [PlayerType.X]: (this.timeLimits[PlayerType.X] as TimeLimit)?.getState(),
        [PlayerType.O]: (this.timeLimits[PlayerType.O] as TimeLimit)?.getState(),
      }
    }
  }

  private updateState(move: Move) {
    this.moves.push(move);
    const lastChangedBoard = this.outerBoard.getBoard(move.coordinates);
    this.updateBoardState(
      move.coordinates.innerRow,
      move.coordinates.innerCol,
      lastChangedBoard,
    );
    this.updateBoardState(
      move.coordinates.outerRow,
      move.coordinates.outerCol,
      this.outerBoard,
    );
    this.updateGameState();
    this.timeLimitHandler.update();
  }

  private updateGameState() {
    this.disableAllFields();
    if (this.outerBoard.winner !== PlayerType.NONE) {
      this.active = false;
      this.over = true;
      return;
    }
    const latestMove = this.moves[this.moves.length - 1];
    this.enableFields(latestMove.coordinates.innerRow, latestMove.coordinates.innerCol);
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
    this.outerBoard
      .getFieldsFlat()
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
    const currentPlayerIdx = movesPerTeam % memberCount;
    this.currentPlayer = teamList[currentPlayerIdx];
  }

  /**
   *
   * @param row Row coordinate of the last changed field
   * @param col Col coordinate of the last changed field
   * @param board Board which was just changed where we want to determine a winner
   */
  private updateBoardState(row: number, col: number, board: Board) {
    const relevantFields = [board.getRowFields(row), board.getColFields(col)];

    if (!((row + col) % 2)) {
      relevantFields.push(board.getDiagonalFields());
      relevantFields.push(board.getAntidiagonalFields());
    }

    const boardHasWinner = relevantFields.some((fields: IWinnable[]) => {
      return fields.map(getWinner).every(isWinnerTheSame);
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
    const playerCountO = this.teams[PlayerType.O].length;
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
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * characters.length)),
      );
    }
    return result.join('');
  }
}

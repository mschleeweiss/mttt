import { Coordinates } from './Coordinates';
import { IWinnable } from './IWinnable';
import { PlayerType } from './PlayerType';

export abstract class Board implements IWinnable {
  winner: PlayerType;
  draw: boolean;
  fields: IWinnable[][];

  constructor() {
    this.draw = false;
    this.fields = [];
    this.winner = PlayerType.NONE;
  }

  public getFieldsFlat(): IWinnable[] {
    return ([] as IWinnable[]).concat(...this.fields);
  }

  public getDiagonalFields(): IWinnable[] {
    return this.fields.map((rowCells: IWinnable[], index: number) => {
      return rowCells[index];
    });
  }

  public getAntidiagonalFields(): IWinnable[] {
    return this.fields.map((rowCells: IWinnable[], index: number) => {
      return rowCells[Coordinates.MAX_VALUE - index];
    });
  }

  public getRowFields(row: number): IWinnable[] {
    return this.fields[row];
  }

  public getColFields(col: number): IWinnable[] {
    return this.fields.map((rowCells: IWinnable[]) => {
      return rowCells[col];
    });
  }
}

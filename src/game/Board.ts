import { Coordinates } from "./Coordinates";
import { IConquerable } from "./IConquerable";
import { PlayerType } from "./PlayerType";

export abstract class Board implements IConquerable {

    conquerer: PlayerType;
    draw: boolean;
    fields: IConquerable[][];

    constructor() {
        this.draw = false;
        this.fields = [];
        this.conquerer = PlayerType.NONE;
    }

    public getFieldsFlat(): IConquerable[] {
        return ([] as IConquerable[]).concat(...this.fields);
    }

    public getDiagonalFields(): IConquerable[] {
        return this.fields.map((rowCells: IConquerable[], index: number) => {
            return rowCells[index];
        });
    }

    public getAntidiagonalFields(): IConquerable[] {
        return this.fields.map((rowCells: IConquerable[], index: number) => {
            return rowCells[Coordinates.MAX_VALUE - index];
        });
    }

    public getRowFields(row: number): IConquerable[] {
        return this.fields[row];
    }

    public getColFields(col: number): IConquerable[] {
        return this.fields.map((rowCells: IConquerable[]) => {
            return rowCells[col];
        });
    }

}
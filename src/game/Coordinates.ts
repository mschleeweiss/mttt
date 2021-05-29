export class Coordinates {
  public static MIN_VALUE = 0;
  public static MAX_VALUE = 2;

  readonly outerRow: number;
  readonly outerCol: number;
  readonly innerRow: number;
  readonly innerCol: number;

  constructor(
    outerRow: number,
    outerCol: number,
    innerRow?: number,
    innerCol?: number,
  ) {
    const valid = [...arguments].every(
      (val: number) =>
        Coordinates.MIN_VALUE <= val && val <= Coordinates.MAX_VALUE,
    );

    if (!valid) {
      throw new Error('Invalid coordinates');
    }

    this.outerRow = outerRow;
    this.outerCol = outerCol;
    this.innerRow = innerRow;
    this.innerCol = innerCol;
  }
}

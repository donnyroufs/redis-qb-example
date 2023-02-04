import { Where } from "./Where"

export class WhereAnd extends Where {
  private _left: Where
  private _right: Where

  public constructor(left: Where, right: Where) {
    super()

    this._left = left
    this._right = right
  }

  public toString(): string {
    return `(${this._left.toString()} ${this._right.toString()})`
  }
}

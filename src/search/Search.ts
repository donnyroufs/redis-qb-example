import { Where } from "./Where"
import { WhereField } from "./WhereField"
import { WhereAnd } from "./WhereAnd"
import { SearchException } from "./SearchException"

export class Search<TEntity extends Record<string, unknown>> {
  private _rootWhere?: Where

  public toString(): string {
    if (!this._rootWhere) {
      throw SearchException.missingWhereClause()
    }

    return this._rootWhere.toString()
  }

  public where(field: keyof TEntity): WhereField<TEntity> {
    this.assureFieldIsOfTypeString(field)
    const where = new WhereField(this, field)

    if (this._rootWhere === undefined) {
      this._rootWhere = where
    } else {
      this._rootWhere = new WhereField(this, field)
    }

    return where
  }

  public and(field: keyof TEntity): WhereField<TEntity> {
    this.assureFieldIsOfTypeString(field)

    const where = new WhereField(this, field)

    if (this._rootWhere === undefined) {
      this._rootWhere = where
    } else {
      this._rootWhere = new WhereAnd(this._rootWhere, where)
    }

    return where
  }

  private assureFieldIsOfTypeString(
    field: keyof TEntity
  ): asserts field is string {
    if (typeof field !== "string") {
      throw SearchException.fieldMustBeOfTypeString()
    }
  }
}

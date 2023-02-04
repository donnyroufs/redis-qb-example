import { Where } from "./Where"
import { Search } from "./Search"
import { RedisString } from "./RedisString"

export class WhereField<TEntity extends Record<string, unknown>> extends Where {
  private _value: string
  private readonly _search: Search<TEntity>
  private readonly _field: string

  public constructor(queryBuilder: Search<TEntity>, field: string) {
    super()

    this._search = queryBuilder
    this._field = field
  }

  public eq(value: string): Search<TEntity> {
    this._value = value.toString()
    return this._search
  }

  public toString(): string {
    const redisString = new RedisString(this._value)
    return `(@${this._field}:${redisString.value})`
  }
}

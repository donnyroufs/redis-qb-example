import { Search } from "./search/Search"

class FilterOptions {
  public readonly search?: string
  public readonly pricelistId?: string

  public constructor(pricelistId: string, search: string) {
    this.search = search
    this.pricelistId = pricelistId
  }
}

type Product = {
  name: string
  pricelistId: string
}

class RedisQueryFactory {
  public create(options: FilterOptions): string {
    const search = new Search<Product>()

    if (options.search) {
      search.where("name").eq(options.search)
    }

    if (options.pricelistId) {
      search.and("pricelistId").eq(options.pricelistId)
    }

    return search.toString()
  }
}

export async function bootstrap(): Promise<void> {
  const f = new RedisQueryFactory()

  const query = f.create({
    pricelistId: "pricelistId",
    search: "john doe",
  })

  console.log({ query })
}

bootstrap()

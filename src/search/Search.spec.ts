import { Search } from "./Search"
import { SearchException } from "./SearchException"

type Product = {
  name: string
  sku: string
}

describe("Search", () => {
  test("returns a where query", () => {
    const search = new Search<Product>()
    const query = search.where("name").eq("banana-king").toString()

    expect(query).toBe("(@name:banana\\king)")
  })

  test("appends two where queries", () => {
    const search = new Search<Product>()
    const query = search
      .where("name")
      .eq("banana-king")
      .and("sku")
      .eq("TTVD-2")
      .toString()

    expect(query).toBe("((@name:banana\\king) (@sku:TTVD\\2))")
  })

  test("throws an exception when no where clause", () => {
    const search = new Search<Product>()

    expect(() => search.toString()).toThrowError(SearchException)
  })
})

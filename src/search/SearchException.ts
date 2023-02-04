export class SearchException extends Error {
  public static missingWhereClause(): SearchException {
    return new SearchException(`
            Cannot build a query without a where clause. A basic query
            should look like:
            
            search
                .where('field')
                .eq('example')
        `)
  }

  public static fieldMustBeOfTypeString(): SearchException {
    return new SearchException(
      "You provided a non string value for a field which is not allowed"
    )
  }
}

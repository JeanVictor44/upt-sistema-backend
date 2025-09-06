export function mapDomainErrors(
  pairs: [Array<new (...args: any[]) => Error>, new (message: string, options: { description: string }) => Error][],
) {
  return new Map(
    pairs.flatMap(([DomainErrors, HttpException]) =>
      DomainErrors.map((DomainError) => [
        DomainError,
        (error: Error) => new HttpException(error.message, { description: error.name }),
      ]),
    ),
  )
}

import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const double = (n: number): number => n * 2

export const imperative = (as: ReadonlyArray<number>): string => {
  const head = (as: ReadonlyArray<number>): number => {
    if (as.length === 0) {
      throw new Error('empty array')
    }
    return as[0]
  }
  const inverse = (n: number): number => {
    if (n === 0) {
      throw new Error('cannot divide by zero')
    }
    return 1 / n
  }
  try {
    return `Result is ${inverse(double(head(as)))}`
  } catch (err: any) {
    return `Error is ${err.message}`
  }
}

export const functional = (as: ReadonlyArray<number>) => {
  const head = <A>(as: ReadonlyArray<A>): E.Either<string, A> =>
    as.length === 0 ? E.left('empty array') : E.right(as[0])
  const inverse = (n: number): E.Either<string, number> => (n === 0 ? E.left('cannot divide by zero') : E.right(1 / n))
  return pipe(
    as,
    head,
    E.map(double),
    E.chain(inverse),
    E.toUnion,
    // E.match(
    //   (err) => `Error is ${err}`, // onLeft handler
    //   (head) => `Result is ${head}` // onRight handler
    // )
  )
}

const res = functional([0.5, 1, 2, 3, 4, 5, 6]);
console.log('res', res);
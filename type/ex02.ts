import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { fromNullableK, toNullable } from 'fp-ts/Option'

const double = (n: number): number => n * 2

export const imperative = (as: ReadonlyArray<number>): string => {
  const head = (as: ReadonlyArray<number>): number => {
    if (as.length === 0) {
      throw new Error()
    }
    return as[0]
  }
  const inverse = (n: number): number => {
    if (n === 0) {
      throw new Error()
    }
    return 1 / n
  }
  try {
    return `Result is ${inverse(double(head(as)))}`
  } catch (e) {
    return 'no result'
  }
}

export const functional = (as: ReadonlyArray<number>): string => {
  const head = <A>(as: ReadonlyArray<A>): O.Option<A> => (as.length === 0 ? O.none : O.some(as[0]))
  const inverse = (n: number): O.Option<number> => (n === 0 ? O.none : O.some(1 / n))
  return pipe(
    as,
    head,
    O.map(double),
    O.chain(inverse),
    O.match(
      () => 'no result', // onNone handler
      (head) => `Result is ${head}` // onSome handler
    )
  )
}

const res = functional([0, 1, 2, 3, 4, 5, 6]);
console.log('res', res);

// const f = (s: string): number | undefined => {
//   const n = parseFloat(s)
//   return isNaN(n) ? undefined : n
// }

// const g = fromNullableK(f)
// // console.log(g('1'), toNullable(g('1')));
// // console.log(g('a'), toNullable(g('a')));

// const altVal = pipe(
//   g('a'),
//   O.alt(() => O.some(0))
// )

// console.log(altVal);

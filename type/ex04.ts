import { some, map } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { match } from 'fp-ts/boolean'

const res = pipe(
  true,
  match(
    () => 'false',
    () => 'true'
  )
)

console.log(res);
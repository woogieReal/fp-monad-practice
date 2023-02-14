import * as readlineSync from 'readline-sync';


/** 
 * I've used trick to encoding HKT(or first-class generics)
 * You can check my tirck in this gist: https://gist.github.com/ENvironmentSet/1662a140f99381bc85fd6be51ecdcbb5
 * */

export interface HKT {
  param: unknown;
  result: unknown;
}

export type Apply<f extends HKT, x>
  = (f & { param: x })['result'];
// const tmp: Apply<{ param: number, result: string }, number> = '';

interface Monad<M extends HKT> { 
  pure<A>(a: A): Apply<M, A>;
  compose<A, B, C>(f: (a: A) => Apply<M, B>, g: (a: B) => Apply<M, C>): (a: A) => Apply<M, C>;
}

type RealWorld = never;
interface IO extends HKT {
  result: (realWorld: RealWorld) => [this['param'], RealWorld];
}

function unsafePerformIO<A>(ioA: Apply<IO, A>): A {
  const realWorld: RealWorld = undefined as RealWorld;

  return ioA(realWorld)[0];
}

function bind<A, B, M extends HKT>(m: Monad<M>, ioA: Apply<M, A>, f: (a: A) => Apply<M, B>): Apply<M, B> {
  return m.compose(_ => ioA, f)(undefined);
}

function print(message: string): Apply<IO, void> {
  return realWorld => (console.log(message), [undefined, realWorld]);
}

function get(message: string = '', defaultValue: string = ''): Apply<IO, string> {
  return realWorld => [readlineSync.question(message) || defaultValue, realWorld];
}

const IOMonad: Monad<IO> = {
  pure<A>(a: A): Apply<IO, A> {
    return realWorld => [a, realWorld];
  },
  compose<A, B, C>(f: (a: A) => Apply<IO, B>, g: (a: B) => Apply<IO, C>): (a: A) => Apply<IO, C> {
    return a => realWorld => {
      const [prevResult, prevRealWorld] = f(a)(realWorld);

      return g(prevResult)(prevRealWorld);
    }
  }
}

const main = bind(
  IOMonad,
  print('Welcome to monadic world'),
  _ => bind(
    IOMonad,
    get('What\'s your name?', 'anonymous user'),
    username => print(`Hi, ${username}`)
  ),
);

unsafePerformIO(main);
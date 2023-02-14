type Maybe<A> = A | null;

const pure = <A>(value: A): Maybe<A> => {
  return value;
};

const compose =<A, B, C>
  (
    f: (a: A) => Maybe<B>,
    g: (a: B) => Maybe<C>
  ) =>
  (a: A): Maybe<C> => {
    const ma = f(a);

    if (ma === null) return null;
    else return g(ma);
};


pure<string>("10");
// -> 10


const makeNumber = (str: string): number | null => {
  if (str.length === 0) return null;
  else return Number(str);
};

const makeBoolean = (num: number): boolean | null => {
  if (num === 0) return null;
  else return Boolean(num);
}

compose<string, number, boolean>(makeNumber, makeBoolean)('10');
// -> true

compose<string, number, boolean>(makeNumber, makeBoolean)('');
// -> null

compose<string, number, boolean>(makeNumber, makeBoolean)('0');
// -> null
class Wrapper {
  constructor (value) {
    this._value = value;
  }

  // map :: (A -> B) A -> B
  map (f) {
    return f(this._value);
  }

  // fmap:: (A -> B) Wrapper[A] -> Wrapper[B]
  fmap (f) {
    return new Wrapper(f(this._value));
  }

  toString() {
    return `Wrapper (${this._value})`;
  }
}

module.exports = Wrapper;
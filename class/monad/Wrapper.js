class Wrapper {
  constructor (value) {
    this._value = value;
  }

  // 단위 함수
  static of (a) {
    return new Wrapper(a);
  }

  // 함수자 - 바인드 함수
  map (f) {
    return Wrapper.of(f(this._value));
  }

  // 중첩된 계층을 눌려 폄
  join () {
    if (!(this._value instanceof Wrapper)) {
      return this;
    }
    return this._value.join();
  }

  get () {
    return this._value;
  }

  toString () {
    return `Wrapper (${this._value})`;
  }
}

module.exports = Wrapper;
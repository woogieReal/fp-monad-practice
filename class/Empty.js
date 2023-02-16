class Empty {
  /**
   * Empty에는 값을 담을 일이 없으니 쓸데없는 코드(no-op)
   * 글자 그래도 빈(empty), 쓸모없음(nothing)을 의미
   */
  map (f) {
    return this;
  }

  // fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B]
  fmap (_) {
    return new Empty();
  }

  toString () {
    return 'Empty ()';
  }
}

module.exports = Empty;
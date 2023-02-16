var _ = require('lodash');

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


/**
 * Wrapper 형은 map을 통해 값에 접근하거나 값을 변경할 수 있다.
 * identity 함수를 컨테이너에 매핑하여 마치 컨테이너에 있던 값처럼 값을 추출한다.
 * 콘솔을 남기거나 값을 조작하는 함수를 컨테이너에 매핑하는 것도 가능
 */
const wrap = (val) => new Wrapper(val);
const wrappedValue = wrap('Get Functional');
// -> Wrapper { _value: 'Get Functional' }

wrappedValue.map(_.identity);
wrappedValue.map(console.log);
// -> Get Functional

wrappedValue.map(_.toUpper);
// -> GET FUNCTIONAL


/**
 * fmap은 주어진 함수를 콘텍스트로 감싼 값에 적용하는 방법이 구현된 함수
 * 1. 먼저 컨테이너를 열고 그 안에 보관된 값에 주어진 함수를 적용
 * 2. 그 결과를 동일한 형식의 새 컨테이너에 넣고 닫는 것으로 마무리
 * 
 * 이러한 함수를 함수자(함자)라고 한다.
 * 호출할 때마다 컨테이너를 새로 복사한 후 반환하는 불변 연산을 수행
 * 원본 값을 바꾸지 않은 상태로 안정하게 값을 꺼내어 연산을 수행하는 역할
 */

wrappedValue.fmap(_.identity);
// -> Wrapper { _value: 'Get Functional' }

const plus = _.curry((a, b) => a + b);
const plus3 = plus(3);

const two = wrap(2);

const five = two.fmap(plus3);

console.log(two);
// -> Wrapper { _value: 2 }
console.log(five);
// -> Wrapper { _value: 5 }


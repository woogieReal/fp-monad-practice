const Wrapper = require('../class/basic/Wrapper');
const Empty = require('../class/basic/Empty');

const wrap = (val) => new Wrapper(val);
const empty = () => new Empty();

// 홀수가 주어지면 빈 컨테이너를 반환
const checkEven = num => Number.isFinite(num) && (num % 2 === 0);
const half = val => checkEven(val) ? wrap(val / 2) : empty();

console.log(half(4));
console.log(half(3));
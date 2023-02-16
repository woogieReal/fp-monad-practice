const _ = require('lodash');
const Wrapper = require('../class/monad/Wrapper');

/**
 * 여기서 map은 중립 함수자 (neutral functor)
 * 주어진 함수를 매핑하고 컨테이너의 대문을 닫는 일이 전부
 */
Wrapper.of('Hello Monads!')
  .map(_.toUpper)
  .map(_.identity)
;
// -> Wrapper { _value: 'HELLO MONADS!' }


const studentList = [
  { id: 1, name: 'Ichiro-Tanaka', nation: 'Japan'   },
  { id: 2, name: 'Ming-Liu',      nation: 'Tiwan'   },
  { id: 3, name: 'Fei',           nation: 'China'   },
  { id: 4, name: 'Jane-Levy',     nation: 'America' },
  { id: 5, name: 'Sangwu-Lee',    nation: 'Korea'   },
  { id: 6, name: 'Tom-Jackson',   nation: 'England' },
  { id: 7, name: 'John-Dow',      nation: 'Gana'    }
];

const find = (list, id) => _.find(list, { 'id': id });

// findObject :: Array -> Number -> Wrapper
const findObject = _.curry((list, id) => Wrapper.of(find(list, id)));

// getNation :: Student -> Wrapper
const getNation = person => Wrapper.of(person.map(_.property('nation')));

const studentNations = _.flow([
  findObject(studentList),
  getNation,
])

// 중첩된 Wrapper 집합을 return
studentNations(2);
// -> Wrapper { _value: Wrapper { _value: 'Tiwan' } }

// join 함수를 적용하여 납작한 단층 구조로 눌러 폄
studentNations(2).join();
// -> Wrapper { _value: 'Tiwan' }

studentNations(2).join().get();
// -> Tiwan
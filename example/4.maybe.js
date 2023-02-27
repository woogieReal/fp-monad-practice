const _ = require("lodash");
const { Maybe } = require("../class/monad/Maybe");
const DB = require("./DB");

const find = (list, id) => _.find(list, { id: id });

// safeFindObject :: DB -> Number -> Maybe
const safeFindObject = _.curry((list, id) =>
  Maybe.fromNullable(find(list, id))
);

// safeFindMember :: Number -> Maybe(Member)
const safeFindMember = safeFindObject(DB["member"]);
const safeFindCountry = safeFindObject(DB["country"]);

// number value or '?'
const nationId = safeFindMember(6)
  .map(_.property("nationId"))
  .getOrElse("?");

// string value or '??'
const language = safeFindCountry(nationId)
  .map(_.property("language"))
  .getOrElse("??");

// 함수 승급(function lifting)
// 특정 함수를 컨테이너에서 작동하는 '안전한' 함수로 변화
const lift = _.curry((f, value) => Maybe.fromNullable(value).map(f))

const findObject = _.curry((list, id) => 
  find(list, id)
);

const findMember = lift(findObject)(DB['member']).getOrElse()
findMember(2);
// { id: 2, name: 'Ming-Liu', nationId: 40 }
const _ = require("lodash");
const { Either } = require("../class/monad/Either");
const DB = require("./DB");

const find = (list, id) => _.find(list, { id: id });

const safeFindObject = _.curry((list, id) => {
  const obj = find(list, id);
  if (obj) {
    return Either.of(obj);
  }
  return Either.left(`ID가 ${id}인 객체를 찾을 수 없습니다.`);
});

const safeFindMember = safeFindObject(DB["member"]);
console.log(safeFindMember(10));
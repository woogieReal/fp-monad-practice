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

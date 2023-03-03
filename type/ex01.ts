import { Option, none, some, fromNullable } from 'fp-ts/Option'
import { Member, DB_DATAS } from './DB';

const findIndex = <A>(
  arr: Array<A>,
  predicate: (a: A) => boolean
): Option<number> => {
  const index = arr.findIndex(predicate)
  return index === -1 ? none : some(index)
}

const index = findIndex<Member>(DB_DATAS.member, (member: Member) => member.id === 2);
// { _tag: 'Some', value: 3 
// { _tag: 'None' }

const find = <A>(
  arr: Array<A>,
  predicate: (a: A) => boolean
): Option<A> => {
  return fromNullable(arr.find(predicate))
}

const member = find<Member>(DB_DATAS.member, (member: Member) => member.id === 2);
// { _tag: 'None' }
// { _tag: 'Some', value: { id: 2, name: 'Ming-Liu', nation: 'Tiwan' } }

const readMemberName = (member: Option<Member>) => {
  member._tag === 'Some' ? console.log(member.value) : console.log(member._tag);
}

readMemberName(member);
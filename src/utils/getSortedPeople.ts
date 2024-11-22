import { SorterTypes, SorterOrder } from './enums/sortedEnums';
import { Person } from '../types';

const sortPeopleByName =
  (order: null | SorterOrder) => (a: Person, b: Person) =>
    order === SorterOrder.DESC
      ? b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      : a.name.toLowerCase().localeCompare(b.name.toLowerCase());

const sortPeopleBySex =
  (order: null | SorterOrder) => (a: Person, b: Person) =>
    order === SorterOrder.DESC
      ? b.sex.toLowerCase().localeCompare(a.sex.toLowerCase())
      : a.sex.toLowerCase().localeCompare(b.sex.toLowerCase());

const sortPeopleByBorn =
  (order: null | SorterOrder) => (a: Person, b: Person) =>
    order === SorterOrder.DESC ? b.born - a.born : a.born - b.born;

const sortPeopleByDied =
  (order: null | SorterOrder) => (a: Person, b: Person) =>
    order === SorterOrder.DESC ? b.died - a.died : a.died - b.died;

const sortPeopleByChar = (type: SorterTypes, order: SorterOrder | null) =>
  type === SorterTypes.NAME ? sortPeopleByName(order) : sortPeopleBySex(order);

const sortPeopleByNumber = (type: SorterTypes, order: SorterOrder | null) =>
  type === SorterTypes.BORN ? sortPeopleByBorn(order) : sortPeopleByDied(order);

type GetSortedPeople = (
  people: Person[],
  sort: SorterTypes | null,
  order: SorterOrder | null,
) => Person[];

export const getSortedPeople: GetSortedPeople = (people, sort, order) => {
  const sortedPeople = structuredClone(people);

  if (sort === SorterTypes.DIED || sort === SorterTypes.BORN) {
    return sortedPeople.sort(sortPeopleByNumber(sort, order));
  }

  if (sort === SorterTypes.NAME || sort === SorterTypes.SEX) {
    return sortedPeople.sort(sortPeopleByChar(sort, order));
  }

  return sortedPeople;
};

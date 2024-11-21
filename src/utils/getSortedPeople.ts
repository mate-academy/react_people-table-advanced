import { sorterTypes, sorterOrder } from '../constants/sortedTypes';
import { Person } from '../types';

const sortPeopleByName =
  (order: null | sorterOrder) => (a: Person, b: Person) =>
    order === sorterOrder.DESC
      ? b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      : a.name.toLowerCase().localeCompare(b.name.toLowerCase());

const sortPeopleBySex =
  (order: null | sorterOrder) => (a: Person, b: Person) =>
    order === sorterOrder.DESC
      ? b.sex.toLowerCase().localeCompare(a.sex.toLowerCase())
      : a.sex.toLowerCase().localeCompare(b.sex.toLowerCase());

const sortPeopleByBorn =
  (order: null | sorterOrder) => (a: Person, b: Person) =>
    order === sorterOrder.DESC ? b.born - a.born : a.born - b.born;

const sortPeopleByDied =
  (order: null | sorterOrder) => (a: Person, b: Person) =>
    order === sorterOrder.DESC ? b.died - a.died : a.died - b.died;

const sortPeopleByChar = (type: sorterTypes, order: sorterOrder | null) =>
  type === sorterTypes.NAME ? sortPeopleByName(order) : sortPeopleBySex(order);

const sortPeopleByNumber = (type: sorterTypes, order: sorterOrder | null) =>
  type === sorterTypes.BORN ? sortPeopleByBorn(order) : sortPeopleByDied(order);

type GetSortedPeople = (
  people: Person[],
  sort: sorterTypes | null,
  order: sorterOrder | null,
) => Person[];

export const getSortedPeople: GetSortedPeople = (people, sort, order) => {
  const sortedPeople = structuredClone(people);

  if (sort === sorterTypes.DIED || sort === sorterTypes.BORN) {
    return sortedPeople.sort(sortPeopleByNumber(sort, order));
  }

  if (sort === sorterTypes.NAME || sort === sorterTypes.SEX) {
    return sortedPeople.sort(sortPeopleByChar(sort, order));
  }

  return sortedPeople;
};

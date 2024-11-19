import { SORTER_TYPES, SORTER_ORDER } from '../constants/sortedTypes';
import { Person } from '../types';

const sortPeopleByName = (order: null | string) => (a: Person, b: Person) =>
  order === SORTER_ORDER.DESC
    ? b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    : a.name.toLowerCase().localeCompare(b.name.toLowerCase());

const sortPeopleBySex = (order: null | string) => (a: Person, b: Person) =>
  order === SORTER_ORDER.DESC
    ? b.sex.toLowerCase().localeCompare(a.sex.toLowerCase())
    : a.sex.toLowerCase().localeCompare(b.sex.toLowerCase());

const sortPeopleByBorn = (order: null | string) => (a: Person, b: Person) =>
  order === SORTER_ORDER.DESC ? b.born - a.born : a.born - b.born;

const sortPeopleByDied = (order: null | string) => (a: Person, b: Person) =>
  order === SORTER_ORDER.DESC ? b.died - a.died : a.died - b.died;

const sortPeopleByChar = (type: string, order: null | string) =>
  type === SORTER_TYPES.NAME ? sortPeopleByName(order) : sortPeopleBySex(order);

const sortPeopleByNumber = (type: string, order: null | string) =>
  type === SORTER_TYPES.BORN
    ? sortPeopleByBorn(order)
    : sortPeopleByDied(order);

type GetSortedPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => Person[];

export const getSortedPeople: GetSortedPeople = (people, sort, order) => {
  const sortedPeople = structuredClone(people);

  if (sort === SORTER_TYPES.DIED || sort === SORTER_TYPES.BORN) {
    return sortedPeople.sort(sortPeopleByNumber(sort, order));
  }

  if (sort === SORTER_TYPES.NAME || sort === SORTER_TYPES.SEX) {
    return sortedPeople.sort(sortPeopleByChar(sort, order));
  }

  return sortedPeople;
};

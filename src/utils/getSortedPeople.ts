import { SorterTypes, SorterOrder } from './enums/sortedEnums';
import { Person } from '../types';
import { sortByAlpabethalyAndOrder, sortByNumberAndOrder } from './sorter';

const sortPeopleByName = (order: null | SorterOrder) =>
  sortByAlpabethalyAndOrder<Person, 'name'>('name', order);

const sortPeopleBySex = (order: null | SorterOrder) =>
  sortByAlpabethalyAndOrder<Person, 'sex'>('sex', order);

const sortPeopleByBorn = (order: null | SorterOrder) =>
  sortByNumberAndOrder<Person, 'born'>('born', order);

const sortPeopleByDied = (order: null | SorterOrder) =>
  sortByNumberAndOrder<Person, 'died'>('died', order);

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

import { SorterTypes, SorterOrder } from './enums/sortedEnums';
import { Person } from '../types';
import { sortByAlpabethalyAndOrder, sortByNumberAndOrder } from './sorter';

type Sort = (order: null | SorterOrder) => (a: Person, b: Person) => number;

const sortPeopleByName: Sort = order =>
  sortByAlpabethalyAndOrder<Person, 'name'>('name', order);

const sortPeopleBySex: Sort = order =>
  sortByAlpabethalyAndOrder<Person, 'sex'>('sex', order);

const sortPeopleByBorn: Sort = order =>
  sortByNumberAndOrder<Person, 'born'>('born', order);

const sortPeopleByDied: Sort = order =>
  sortByNumberAndOrder<Person, 'died'>('died', order);

type GetSortedPeople = (
  people: Person[],
  sort: SorterTypes | null,
  order: SorterOrder | null,
) => Person[];

export const getSortedPeople: GetSortedPeople = (people, sort, order) => {
  const sortedPeople = structuredClone(people);

  switch (sort) {
    case SorterTypes.DIED:
      return people.sort(sortPeopleByBorn(order));

    case SorterTypes.BORN:
      return people.sort(sortPeopleByDied(order));

    case SorterTypes.NAME:
      return people.sort(sortPeopleByName(order));

    case SorterTypes.SEX:
      return people.sort(sortPeopleBySex(order));

    default:
      return sortedPeople;
  }
};

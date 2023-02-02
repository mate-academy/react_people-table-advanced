import { Person } from '../types';
import { SortParam } from '../types/SortParam';

type FilterArgs = {
  people: Person[],
  gender: string | null,
  query: string | null,
  century: string[],
};
type FilterPeopleType = (args: FilterArgs) => Person[];

export const filterPeople: FilterPeopleType = (args) => {
  const {
    people,
    gender,
    query,
    century,
  } = args;
  let readyPeopleArr = people;

  if (gender || query || century.length) {
    readyPeopleArr = people.filter(person => {
      const genderFilter = gender
        ? person.sex === gender
        : true;

      const queryInLowCase = query?.toLowerCase();

      const queryFilter = queryInLowCase
        ? person.name.toLowerCase().includes(queryInLowCase)
        || person.motherName?.toLowerCase().includes(queryInLowCase)
        || person.fatherName?.toLowerCase().includes(queryInLowCase)
        : true;

      const centuryFilter = century.length
        ? century.includes(Math.ceil(person.born / 100).toString())
        : true;

      return genderFilter && queryFilter && centuryFilter;
    });
  }

  return readyPeopleArr;
};

type SortArgs = {
  filteredPeople: Person[],
  sort: string | null,
  order: string | null,
};

type SortPeopleType = (args: SortArgs) => Person[];

export const sortPeople: SortPeopleType = (args) => {
  const { filteredPeople, sort, order } = args;

  if (sort) {
    filteredPeople.sort((a: Person, b: Person) => {
      switch (sort) {
        case SortParam.Name:
        case SortParam.Sex:
          return a[sort].localeCompare(b[sort]);

        case SortParam.Born:
        case SortParam.Died:
          return a[sort] - b[sort];

        default:
          return 1;
      }
    });
  }

  return order
    ? filteredPeople.reverse()
    : filteredPeople;
};

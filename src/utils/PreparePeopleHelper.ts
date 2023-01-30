import { Person } from '../types';
import { SortParam } from '../types/SortParam';

type FilterPeopleType = (
  people: Person[],
  gender: string | null,
  query: string | null,
  century: string[],
) => Person[];

export const FilterPeople: FilterPeopleType = (
  people,
  gender,
  query,
  century,
) => {
  let readyPeopleArr = people;

  if (gender || query || century.length) {
    readyPeopleArr = people.filter(person => {
      const genderFilter = gender ? person.sex === gender : true;
      const queryFilter = query
        ? person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        : true;
      const centuryFilter = century.length
        ? century.includes(Math.ceil(person.born / 100).toString())
        : true;

      return genderFilter && queryFilter && centuryFilter;
    });
  }

  return readyPeopleArr;
};

type SortPeopleType = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => Person[];

export const sortPeople: SortPeopleType = (people, sort, order) => {
  if (sort) {
    people.sort((a: Person, b: Person) => {
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

  return order ? people.reverse() : people;
};

import { Person, SortParams } from '../types';

type FilterParams = {
  query: string;
  sex: string;
  sort: string;
  centuries: string[];
  order: string;
};

export function getFilteredPeople(
  people: Person[],
  {
    query, sex, sort, centuries, order,
  }: FilterParams,
) {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      return person.name.toLowerCase().includes(query.toLowerCase())
      || person.motherName?.toLowerCase().includes(query.toLowerCase())
      || person.fatherName?.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => centuries.includes(`${Math.ceil(person.born / 100)}`));
  }

  if (sort) {
    switch (sort) {
      case SortParams.NAME:
      case SortParams.SEX:
        filteredPeople = filteredPeople.sort(
          (person1, person2) => person1[sort].localeCompare(person2[sort]),
        );
        break;

      case SortParams.BORN:
      case SortParams.DIED:
        filteredPeople = filteredPeople.sort(
          (person1, person2) => person1[sort] - person2[sort],
        );
        break;

      default:
        return filteredPeople;
    }
  }

  if (order === 'desc') {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}

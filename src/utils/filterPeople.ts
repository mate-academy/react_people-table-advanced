import { Person } from '../types';
import { SortFilters } from './filterHelpers';

type FilterParams = {
  preparedPeople: Person[];
  query: string;
  sex: string | null;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

export function filterPeople({
  preparedPeople,
  query,
  sex,
  centuries,
  sort,
  order,
}: FilterParams): Person[] {
  let filteredPeople = preparedPeople
    .filter(person => {
      const normalizedQuery = query?.toLowerCase();

      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    })
    .filter(person => {
      if (sex) {
        return person.sex === sex;
      }

      return true;
    })
    .filter(person => {
      if (!!centuries?.length) {
        const year = Math.ceil(person.born / 100).toString();

        return centuries.includes(year);
      }

      return true;
    })
    .sort((person1, person2) => {
      switch (sort) {
        case SortFilters.Name:
          return person1.name.localeCompare(person2.name);
        case SortFilters.Sex:
          return person1.sex.localeCompare(person2.sex);
        case SortFilters.Born:
          return person1.born - person2.born;
        case SortFilters.Died:
          return person1.died - person2.died;
        default:
          return 0;
      }
    });

  if (order === 'desc') {
    filteredPeople = [...filteredPeople].reverse();
  }

  return filteredPeople;
}

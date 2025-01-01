import { SORT_FILTERS } from '../constants/constants';
import { Person } from '../types';

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
      if (centuries.length > 0) {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      }

      return true;
    })
    .sort((person1, person2) => {
      switch (sort) {
        case SORT_FILTERS.NAME:
          return person1.name.localeCompare(person2.name);
        case SORT_FILTERS.SEX:
          return person1.sex.localeCompare(person2.sex);
        case SORT_FILTERS.BORN:
          return person1.born - person2.born;
        case SORT_FILTERS.DIED:
          return person1.died - person2.died;
        default:
          return 0;
      }
    });

  if (order === 'desc') {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}

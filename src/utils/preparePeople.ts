import { Person } from '../types';
import { Filters } from '../types/Filters';
import { Sorting } from '../types/Sorting';

function yearToCentury(year: number) {
  if (!Number.isInteger(year) || year <= 0) {
    throw new Error('Please provide a valid positive integer for the year.');
  }

  const century = Math.ceil(year / 100);

  return century;
}

const isIncludesQuery = (
  name: string | null,
  normalizedQuery: string,
) => {
  return name?.toLowerCase().includes(normalizedQuery);
};

type Ftype = (people: Person[], filters: Filters, sorting: Sorting) => Person[];

export const preparePeople: Ftype = (people, filters, sorting) => {
  let filteredPeople = [...people];
  const { sex, query, centuries } = filters;
  const sortType = sorting.sort;
  const order = sorting.order || 'asc';

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedQuery = query.toLowerCase();

      return isIncludesQuery(person.name, normalizedQuery)
        || isIncludesQuery(person.fatherName, normalizedQuery)
        || isIncludesQuery(person.motherName, normalizedQuery);
    });
  }

  if (centuries && centuries.length > 0) {
    filteredPeople = filteredPeople
      .filter(person => centuries.includes(String(yearToCentury(person.born))));
  }

  const sortedPeople = [...filteredPeople];

  if (sortType && order) {
    sortedPeople.sort((p1, p2) => {
      const value1 = p1[sortType];
      const value2 = p2[sortType];
      const areNumerical = (
        typeof value1 === 'number'
        && typeof value2 === 'number'
      );

      if (areNumerical) {
        if (order === 'asc') {
          return value1 - value2;
        }

        return value2 - value1;
      }

      if (!areNumerical) {
        if (order === 'asc') {
          return String(value1)?.localeCompare(String(value2));
        }

        return String(value2)?.localeCompare(String(value1));
      }

      return 0;
    });
  }

  return sortedPeople;
};

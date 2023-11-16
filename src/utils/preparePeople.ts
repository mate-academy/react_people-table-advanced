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

      return person.name.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery);
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

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        if (order === 'asc') {
          return value1 - value2;
        }

        return value2 - value1;
      }

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        if (order === 'asc') {
          return value1.localeCompare(value2);
        }

        return value2.localeCompare(value1);
      }

      return 0;
    });
  }

  return sortedPeople;
};

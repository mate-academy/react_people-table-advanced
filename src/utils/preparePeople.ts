import { Person } from '../types';
import { Filters } from '../types/Filters';

function yearToCentury(year: number) {
  if (!Number.isInteger(year) || year <= 0) {
    throw new Error('Please provide a valid positive integer for the year.');
  }

  const century = Math.ceil(year / 100);

  return century;
}

export const preparePeople = (people: Person[], filters: Filters) => {
  let filteredPeople = [...people];
  const { sex, query, centuries } = filters;

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedQuery = query.toLowerCase();

      return person.name.includes(normalizedQuery)
        || person.fatherName?.includes(normalizedQuery)
        || person.motherName?.includes(normalizedQuery);
    });
  }

  if (centuries && centuries.length > 0) {
    filteredPeople = filteredPeople
      .filter(person => centuries.includes(String(yearToCentury(person.born))));
  }

  return filteredPeople;
};

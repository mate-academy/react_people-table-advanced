import { Person } from '../types';

export const FilteringPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  let filtered = [...people];

  if (query) {
    filtered = filtered.filter(person => {
      const preparedQuery = query.toLowerCase().trim();

      return person.name.toLowerCase().includes(preparedQuery)
        || person.motherName?.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery);
    });
  }

  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filtered = filtered.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return filtered;
};

import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] => {
  let filtered = [...people];

  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  if (query) {
    filtered = filtered.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName || '').toLowerCase().includes(query.toLowerCase()) ||
        (person.fatherName || '').toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    filtered = filtered.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  return filtered;
};

import { Person } from '../types';

type FilterParams = {
  sex: 'm' | 'f' | null;
  centuries: string[];
  query: string;
};

export const getFilteredPeople = (
  people: Person[],
  { sex, centuries, query }: FilterParams,
) => {
  if (sex) {
    return [...people].filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    return [...people].filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    return [...people].filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  return people;
};

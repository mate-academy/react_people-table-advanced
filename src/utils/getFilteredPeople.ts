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
  return [...people]
    .filter(person => !sex || person.sex === sex)
    .filter(
      person =>
        centuries.length === 0 ||
        centuries.includes(String(Math.ceil(person.born / 100))),
    )
    .filter(person => {
      const normalizedQuery = query.trim().toLowerCase();

      return (
        !normalizedQuery ||
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
};

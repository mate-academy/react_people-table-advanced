import { Person } from '../../types';

export const filterByQuery = (people: Person[], query: string | null) => {
  if (!query || !query.trim()) {
    return people;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return people.filter(
    person =>
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery),
  );
};

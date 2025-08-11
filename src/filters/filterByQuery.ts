import { Person } from '../types';

export const filterByQuery = (people: Person[], query: string | null) => {
  const formattedQuery = query?.trim().toLowerCase();

  if (!formattedQuery) {
    return people;
  }

  return people.filter(
    person =>
      person.name.toLowerCase().includes(formattedQuery) ||
      person.motherName?.toLowerCase().includes(formattedQuery) ||
      person.fatherName?.toLowerCase().includes(formattedQuery),
  );
};

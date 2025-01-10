import { Person } from '../types';

export const filterByQuery = (people: Person[], query: string | null) => {
  const formatedQuery = query?.trim().toLowerCase();

  if (!formatedQuery) {
    return people;
  }

  return people.filter(
    person =>
      person.name.toLowerCase().includes(formatedQuery) ||
      person.motherName?.toLowerCase().includes(formatedQuery) ||
      person.fatherName?.toLowerCase().includes(formatedQuery),
  );
};

import { Person } from '../types';

export const getSortQuery = (sorted: Person[], query: string) => {
  const lowerQuerty = (pers: string) =>
    pers.toLowerCase().includes(query.toLowerCase());

  return sorted.filter(
    person =>
      lowerQuerty(person.name) ||
      lowerQuerty(person.motherName || '') ||
      lowerQuerty(person.fatherName || ''),
  );
};

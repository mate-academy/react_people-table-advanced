import { Person } from '../types';

export const matchesQuery = (
  person: Person,
  query: string,
): boolean | undefined => {
  return (
    person.name.toLowerCase().includes(query.toLowerCase())
    || person.motherName?.toLowerCase().includes(query.toLowerCase())
    || person.fatherName?.toLowerCase().includes(query.toLowerCase())
  );
};

import { Person } from '../types';

export const QueryPersonComparison = (
  query: string,
  person: Person,
) => (
  person.name.toLowerCase().includes(query.toLowerCase().trim())
  || person.motherName?.toLowerCase().includes(query.toLowerCase().trim())
  || person.fatherName?.toLowerCase().includes(query.toLowerCase().trim())
);

import { Person } from '../types';

export const filterByName = (people: Person[], query: string): Person[] =>
  people.filter(person => {
    const sanitazedQuery = query.toLowerCase().trim();

    return (
      person.name.toLowerCase().includes(sanitazedQuery) ||
      person.motherName?.toLowerCase().includes(sanitazedQuery) ||
      person.fatherName?.toLowerCase().includes(sanitazedQuery)
    );
  });

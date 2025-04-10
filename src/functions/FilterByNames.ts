import { Person } from '../types';

export const filterByNames = (people: Person[], query: string): Person[] => {
  return people.filter(person => {
    if (
      person.name.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  });
};

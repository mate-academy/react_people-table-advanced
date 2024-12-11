import { Person } from '../types';

export const findPersonByName = (
  name: string | null,
  people: Person[],
): Person | null => {
  return people.find(person => person.name === name) || null;
};

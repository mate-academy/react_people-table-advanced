import { Person } from '../types';

export const findPersonByName = (
  people: Person[],
  name: string,
): Person | null => {
  return people.find(person => person.name === name) || null;
};

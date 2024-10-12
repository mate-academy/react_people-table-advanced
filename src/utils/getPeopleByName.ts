import { Person } from '../types';

export const getPersonByName = (
  name: string | null,
  people: Person[],
): Person | undefined => {
  return people.find(person => person.name === name);
};

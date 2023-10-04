import { Person } from '../types';

export const findPersonByName = (
  people: Person[],
  name: string | null,
): Person | null => {
  if (!name) {
    return null;
  }

  return people.find(person => person.name === name) || null;
};

import { Person } from '../types';

export const findPersonByName = (
  people: Person[],
  personName: string | null,
): Person | null => {
  if (!personName) {
    return null;
  }

  return people.find(({ name }) => name === personName) || null;
};

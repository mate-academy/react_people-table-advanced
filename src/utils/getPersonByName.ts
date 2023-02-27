import { Person } from '../types';

export const getPersonByName = (
  people: Person[],
  name: string | null,
): Person | undefined => (
  people.find(person => person.name === name)
);

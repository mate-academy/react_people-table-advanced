import { Person } from '../types';

export const getParent = (
  people: Person[],
  parentName: string | null,
): Person | undefined => (
  people.find(person => person.name === parentName)
);

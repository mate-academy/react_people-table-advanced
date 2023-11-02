import { Person } from '../types';

export const findParent = (
  people: Person[],
  parentName: string | null,
): Person | null => {
  return people.find(({ name }) => name === parentName) || null;
};

import { Person } from '../types';

export const getParentPerson = (
  people: Person[],
  parentName: string | null,
) => {
  return people.find(({ name }) => name === parentName);
};

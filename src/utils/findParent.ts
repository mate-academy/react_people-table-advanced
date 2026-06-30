import { Person } from '../types';

export const findParent = (parentName: string | null, people: Person[]) => {
  const isParent = people.find(person => person.name === parentName);

  return isParent ? isParent : parentName;
};

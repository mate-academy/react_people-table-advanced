import { Person } from '../types';

export const findParent = (parentName: string | null, people: Person[]) => {
  const parent = parentName
    ? people.find(person => parentName === person.name)
    : null;

  return parent;
};

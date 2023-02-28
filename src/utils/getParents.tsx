import { Person } from '../types';

export const getParents = (people: Person[], parentName: string | null) => {
  return people.find(person => person.name === parentName);
};

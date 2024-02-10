import { Person } from '../types';

export const getParent = (name: string, people: Person[]) => {
  return people.find(person => person.name === name);
};

import { Person } from '../types';

export const getParent = (people: Person[], parent: string | null) => {
  return people.find(person => person.name === parent);
};

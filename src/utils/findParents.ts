import { Person } from '../types';

export const findParents = (peopleArr: Person[], name: string) => {
  return peopleArr.find(person => person.name === name);
};

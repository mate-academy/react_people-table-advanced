import { Person } from '../types';

export const findPerson = (people: Person[], name: string) => {
  return people.find((person) => person.name === name);
};

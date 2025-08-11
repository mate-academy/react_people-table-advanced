import { Person } from '../types';

export const filterBySex = (people: Person[], sex: string): Person[] => {
  return people.filter(person => person.sex === sex);
};

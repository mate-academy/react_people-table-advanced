import { Person } from '../../types';

export const filterBySex = (people: Person[], sex: string): Person[] => {
  if (!sex) {
    return people;
  }

  return people.filter(person => person.sex === sex);
};

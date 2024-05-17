import { Person } from '../types';

export const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(item => {
    return {
      ...item,
      father: people.find(person => person.name === item.fatherName),
      mother: people.find(person => person.name === item.motherName),
    };
  });
};
